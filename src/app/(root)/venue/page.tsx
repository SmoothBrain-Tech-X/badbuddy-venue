"use client";
import useGetProfile from "@/hooks/profile/useGetProfile";
import { ActionIcon, Text, TextInput } from "@mantine/core";
import { Table } from "antd";
import { IconEye, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { type ColumnProps } from "antd/es/table";
import useGetVenue from "@/hooks/venue/useGetVenue";

export default function Page() {
  const getProfile = useGetProfile();
  const [keyWord, setKeyWord] = useState("");

  type ColumnType = NonNullable<typeof getProfile.data>["venues"] extends
    | (infer T)[]
    | null
    | undefined
    ? T
    : never;

  return (
    <div className="flex flex-col gap-3">
      <Text size="xl" fw={700}>
        My Venues
      </Text>
      <div className="flex items-center justify-between">
        <TextInput
          placeholder="Search venues"
          leftSection={<IconSearch size={16} />}
          value={keyWord}
          onChange={(e) => setKeyWord(e.currentTarget.value)}
        />
      </div>
      <Table
        bordered
        loading={getProfile.isRefetching || getProfile.isLoading}
        dataSource={getProfile.data?.venues ?? []}
        columns={
          [
            {
              title: "Name",
              render: (_, record) => <VenueName venue_id={record.id} />,
            },
            {
              title: "Action",
              render: (_, record) => (
                <div className="flex gap-2">
                  <Link href={`/venue/${record.id}`}>
                    <ActionIcon variant="subtle">
                      <IconEye />
                    </ActionIcon>
                  </Link>
                </div>
              ),
            },
          ] as ColumnProps<ColumnType>[]
        }
      />
    </div>
  );
}

interface PropsVenueName {
  venue_id: string;
}

function VenueName(props: PropsVenueName) {
  const getVenue = useGetVenue({ venue_id: props.venue_id });
  return <div>{getVenue.data?.name}</div>;
}
