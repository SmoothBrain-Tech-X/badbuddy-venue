export const bookingStatus = [
  {
    label: "Pending",
    value: "pending",
    color: "orange",
  },
  {
    label: "Confirmed",
    value: "confirmed",
    color: "green",
  },
  {
    label: "Cancelled",
    value: "cancelled",
    color: "red",
  },
];

export const getBookingStatusMap = (value: string) => {
  return bookingStatus.find((item) => item.value === value);
};
