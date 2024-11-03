"use client";
import { BaseModalData } from "@/configs/ModalData/ModalData";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import useCancelBooking from "@/hooks/booking/useCancelBooking";
import useGetBookings from "@/hooks/booking/useGetBookings";
import useUpdateBookingPayment from "@/hooks/booking/useUpdateBookingPayment";
import { ActionIcon, Badge, NumberFormatter, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Table } from "antd";
import { type ColumnProps } from "antd/es/table";
import { AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { getBookingStatusMap } from "utils/BookingStatusMap";

export default function Page() {
  const getBookings = useGetBookings();
  const updateBookingPayment = useUpdateBookingPayment();
  const cancelBooking = useCancelBooking();

  type ColumnType = NonNullable<typeof getBookings.data>["bookings"] extends
    | (infer T)[]
    | null
    | undefined
    ? T
    : never;

  const onPaid = (data: ColumnType) => {
    modals.openConfirmModal({
      ...BaseModalData,
      title: "Confirm Payment",
      children: "Are you sure want to confirm this payment?",
      onConfirm: () => {
        const noti = notifications.show(LoadingNotificationData);
        updateBookingPayment.mutate(
          {
            booking_id: data.id,
            status: "completed",
            payment_method: "cash",
          },
          {
            onSuccess: () => {
              notifications.update({
                ...SuccessNotificationData,
                id: noti,
              });
              void getBookings.refetch();
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                notifications.update({
                  ...ErrorNotificationData,
                  id: noti,
                  message: error.response?.data.message,
                });
              }
            },
          },
        );
      },
    });
  };

  const onCancel = (data: ColumnType) => {
    modals.openConfirmModal({
      ...BaseModalData,
      title: "Confirm Cancel",
      children: "Are you sure want to cancel this reservation?",
      onConfirm: () => {
        const noti = notifications.show(LoadingNotificationData);
        cancelBooking.mutate(
          {
            booking_id: data.id,
          },
          {
            onSuccess: () => {
              notifications.update({
                ...SuccessNotificationData,
                id: noti,
              });
              void getBookings.refetch();
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                notifications.update({
                  ...ErrorNotificationData,
                  id: noti,
                  message: error.response?.data.message,
                });
              }
            },
          },
        );
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Text size="xl" fw={700}>
        Reservation
      </Text>
      <div className="overflow-x-auto">
        <Table
          bordered
          loading={getBookings.isRefetching || getBookings.isLoading}
          dataSource={getBookings.data?.bookings ?? []}
          columns={
            [
              {
                title: "Court Name",
                render: (_, record) => record.court_name,
              },
              {
                title: "Venue",
                render: (_, record) => record.venue_name,
              },
              {
                title: "Reservation by",
                render: (_, record) => record.user_name,
              },
              {
                title: "Amount",
                render: (_, record) => (
                  <NumberFormatter
                    value={record.total_amount}
                    thousandSeparator
                  />
                ),
              },
              {
                title: "Status",
                render: (_, record) => (
                  <Badge
                    variant="light"
                    color={getBookingStatusMap(record.status)?.color}
                  >
                    {record.status}
                  </Badge>
                ),
              },
              {
                title: "Reservation Date",
                render: (_, record) =>
                  format(parseISO(record.created_at), "dd/MM/yyyy HH:mm"),
              },
              {
                title: "Action",
                render: (_, record) =>
                  (record.status !== "confirmed" && record.status !== "cancelled") && (
                    <div className="flex gap-2">
                      <ActionIcon
                        onClick={() => onPaid(record)}
                        variant="light"
                        color="green"
                      >
                        <IconCheck />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => onCancel(record)}
                        variant="light"
                        color="red"
                      >
                        <IconX />
                      </ActionIcon>
                    </div>
                  ),
              },
            ] as ColumnProps<ColumnType>[]
          }
        />
      </div>
    </div>
  );
}
