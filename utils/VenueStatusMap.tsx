export const venueStatus = [
  {
    label: "Active",
    value: "active",
    color: "green",
  },
  {
    label: "Inactive",
    value: "inactive",
    color: "red",
  },
  {
    label: "Pending",
    value: "pending",
    color: "orange",
  },
  {
    label: "Suspended",
    value: "suspended",
    color: "red",
  },
];

export const getVenueStatusMap = (value: string) => {
  return venueStatus.find((item) => item.value === value);
};
