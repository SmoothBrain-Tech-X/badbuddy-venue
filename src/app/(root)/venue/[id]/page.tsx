/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Container,
  Stack,
  Paper,
  Title,
  Text,
  Group,
  Grid,
  ActionIcon,
  Button,
  Badge,
  Table,
  Modal,
  Menu,
  Skeleton,
} from "@mantine/core";
import {
  IconEdit,
  IconPlus,
  IconMapPin,
  IconClock,
  IconDotsVertical,
  IconTrash,
} from "@tabler/icons-react";
import { format } from "date-fns";
import useGetVenue from "@/hooks/venue/useGetVenue";
import VenueForm from "@/app/(root)/venue/_components/VenueForm/VenueForm";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import useUpdateVenue from "@/hooks/venue/useUpdateVenue";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import { AxiosError } from "axios";
import CourtForm from "../_components/CourtForm/CourtForm";
import { type CourtSchemaType } from "@/schemas/court/court.schema";
import { getCourtStatusMap } from "utils/CourtStatusMap";
import useAddCourt from "@/hooks/court/useAddCourt";
import useUpdateCourt from "@/hooks/court/useUpdateCourt";
import useDeleteCourt from "@/hooks/court/useDeleteCourt";
import { modals } from "@mantine/modals";
import { ConfirmDeleteModalData } from "@/configs/ModalData/ModalData";
import { useParams } from "next/navigation";
import BackButton from "@/app/_components/BackButton/BackButton";

export default function Page() {
  const params = useParams<{ id: string }>();
  const venue_id = params.id ?? "";
  const getVenue = useGetVenue({
    venue_id: params.id,
  });
  const updateVenue = useUpdateVenue();
  const addCourt = useAddCourt();
  const updateCourt = useUpdateCourt();
  const deleteCourt = useDeleteCourt();

  const [editVenueOpen, setEditVenueOpen] = useState(false);
  const [addCourtOpen, setAddCourtOpen] = useState(false);
  const [editCourtOpen, setEditCourtOpen] = useState(false);

  const [EditCourt, setEditCourt] = useState<CourtSchemaType | null>(null);

  const onEditVenue = (data: VenueSchemaType) => {
    const notiKey = notifications.show(LoadingNotificationData);
    updateVenue.mutate(
      { venue_id: venue_id, status: data.status ?? "", ...data },
      {
        onSuccess: () => {
          notifications.update({
            id: notiKey,
            ...SuccessNotificationData,
            message: "Venue updated successfully",
          });
          void getVenue.refetch();
          setEditVenueOpen(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifications.update({
              id: notiKey,
              ...ErrorNotificationData,
              message: error.message,
            });
          }
        },
      },
    );
  };

  const onAddCourt = (data: CourtSchemaType) => {
    const notiKey = notifications.show(LoadingNotificationData);
    addCourt.mutate(
      {
        venue_id: venue_id,
        ...data,
      },
      {
        onSuccess: () => {
          notifications.update({
            ...SuccessNotificationData,
            id: notiKey,
            message: "Court added successfully",
          });
          void getVenue.refetch();
          setAddCourtOpen(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifications.update({
              ...ErrorNotificationData,
              id: notiKey,
              message: error.message,
            });
          }
        },
      },
    );
  };

  const onEditCourt = (data: CourtSchemaType) => {
    if (!EditCourt) return;
    const notiKey = notifications.show(LoadingNotificationData);
    updateCourt.mutate(
      {
        venue_id: venue_id,
        court_id: data.court_id ?? "",
        status: data.status ?? "",
        ...data,
      },
      {
        onSuccess: () => {
          notifications.update({
            ...SuccessNotificationData,
            id: notiKey,
            message: "Court updated successfully",
          });
          void getVenue.refetch();
          setEditCourt(null);
          setEditCourtOpen(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifications.update({
              ...ErrorNotificationData,
              id: notiKey,
              message: error.message,
            });
          }
        },
      },
    );
  };

  const onDeleteCourt = (data: CourtSchemaType) => {
    modals.openConfirmModal({
      ...ConfirmDeleteModalData,
      onConfirm: () => {
        const notiKey = notifications.show(LoadingNotificationData);
        deleteCourt.mutate(
          {
            venue_id: venue_id,
            court_id: data.court_id ?? "",
          },
          {
            onSuccess: () => {
              notifications.update({
                ...SuccessNotificationData,
                id: notiKey,
                message: "Court deleted successfully",
              });
              void getVenue.refetch();
              setEditCourt(null);
              setEditCourtOpen(false);
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                notifications.update({
                  ...ErrorNotificationData,
                  id: notiKey,
                  message: error.message,
                });
              }
            },
          },
        );
      },
    });
  };

  const renderOverview = () => (
    <Stack>
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            {getVenue.isPending ? (
              <Skeleton height={20} width={300} />
            ) : (
              <Title order={4}>{getVenue.data?.name}</Title>
            )}
          </div>
          <Button
            variant="light"
            leftSection={<IconEdit size={16} />}
            onClick={() => setEditVenueOpen(true)}
          >
            Edit Details
          </Button>
        </Group>

        <Grid>
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Group gap="xs">
                <IconMapPin size={16} />
                <Text fw={500}>Location</Text>
              </Group>
              {getVenue.isPending ? (
                <Skeleton height={20} width={150} />
              ) : (
                <Text size="sm">{getVenue.data?.address}</Text>
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Group gap="xs">
                <IconClock size={16} />
                <Text fw={500}>Operating Hours</Text>
              </Group>
              {getVenue.isPending ? (
                <Group gap="xs">
                  <Skeleton height={20} width={"100%"} maw={500} />
                  <Skeleton height={20} width={"100%"} maw={500} />
                  <Skeleton height={20} width={"100%"} maw={500} />
                </Group>
              ) : (
                <Group gap="xs">
                  {getVenue.data?.open_range.map((range, index) => (
                    <Badge
                      variant={range.is_open ? "light" : "light"}
                      key={index}
                      color={range.is_open ? "green" : "gray"}
                    >
                      {range.day} {format(range.open_time, "HH:mm")} -{" "}
                      {format(range.close_time, "HH:mm")}
                    </Badge>
                  ))}
                </Group>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Courts List */}
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={4}>Courts Management</Title>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => setAddCourtOpen(true)}
          >
            Add Court
          </Button>
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Court</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {getVenue.data?.courts.map((court) => (
              <Table.Tr key={court.id}>
                <Table.Td>
                  <Text fw={500}>{court.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={getCourtStatusMap(court.status)?.color}>
                    {court.status}
                  </Badge>
                </Table.Td>
                <Table.Td>{court.price_per_hour}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Menu position="bottom-end" withinPortal>
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <IconDotsVertical size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() => {
                            setEditCourt({
                              ...court,
                              court_id: court.id,
                            });
                            setEditCourtOpen(true);
                          }}
                          leftSection={<IconEdit size={14} />}
                        >
                          Edit Court
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          onClick={() =>
                            onDeleteCourt({
                              ...court,
                              court_id: court.id,
                            })
                          }
                          leftSection={<IconTrash size={14} />}
                        >
                          Delete Court
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );

  return (
    <div className="">
      <BackButton />
      {renderOverview()}
      <Modal
        opened={editVenueOpen}
        onClose={() => setEditVenueOpen(false)}
        title="Edit Venue Details"
        size="lg"
      >
        {getVenue.data && (
          <VenueForm
            type="edit"
            onFinish={onEditVenue}
            data={{
              ...getVenue.data,
              name: getVenue.data?.name ?? "",
              description: getVenue.data?.description ?? "",
              address: getVenue.data?.address ?? "",
              phone: getVenue.data?.phone ?? "",
              email: getVenue.data?.email ?? "",
              image_urls: getVenue.data?.image_urls ?? "",
              status: getVenue.data?.status ?? "",
              facilities: getVenue.data?.facilities ?? [],
            }}
          />
        )}
      </Modal>

      <Modal
        opened={addCourtOpen}
        onClose={() => setAddCourtOpen(false)}
        title="Add New Court"
      >
        <CourtForm
          isLoading={addCourt.isPending}
          onFinish={onAddCourt}
          type="create"
        />
      </Modal>

      <Modal
        opened={editCourtOpen}
        onClose={() => setEditCourtOpen(false)}
        title="Edit Court Details"
      >
        <CourtForm
          isLoading={updateCourt.isPending}
          onFinish={onEditCourt}
          type="edit"
          data={EditCourt ?? undefined}
        />
      </Modal>
    </div>
  );
}

export const dynamic = "force-dynamic";
