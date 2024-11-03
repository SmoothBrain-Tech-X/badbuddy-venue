export const paymentStatus = [
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
    label: "Failed",
    value: "failed",
    color: "red",
  },
  {
    label: "Refunded",
    value: "refunded",
    color: "blue",
  },
];

export const getPaymentStatusMap = (value: string) => {
  return paymentStatus.find((item) => item.value === value);
};
