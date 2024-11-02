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
  TextInput,
  Select,
  Textarea,
  FileInput,
  Switch,
  Menu,
  Tabs,
} from "@mantine/core";
import { format } from "date-fns";
import { TimeInput } from "@mantine/dates";
import {
  IconEdit,
  IconPlus,
  IconMapPin,
  IconClock,
  IconSettings,
  IconChartBar,
  IconUsers,
  IconCalendarEvent,
  IconBuilding,
  IconDotsVertical,
  IconX,
} from "@tabler/icons-react";
import useGetVenue from "@/hooks/venue/useGetVenue";
import VenueForm from "@/app/(root)/venue/_components/VenueForm/VenueForm";

export default function Page() {
  const getVenue = useGetVenue({
    venue_id: "0c8f9940-99e5-48bf-89ea-da05adfc1d27",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [editVenueOpen, setEditVenueOpen] = useState(false);
  const [addCourtOpen, setAddCourtOpen] = useState(false);

  // Sample data
  const venueStats = [
    {
      title: "Today's Bookings",
      value: "24",
      change: "+12%",
      icon: IconCalendarEvent,
      color: "blue",
    },
    {
      title: "Active Courts",
      value: "8",
      change: "0%",
      icon: IconBuilding,
      color: "green",
    },
    {
      title: "Total Revenue",
      value: "฿12,450",
      change: "+8%",
      icon: IconChartBar,
      color: "violet",
    },
    {
      title: "Court Utilization",
      value: "75%",
      change: "+5%",
      icon: IconUsers,
      color: "orange",
    },
  ];

  const courts = [
    {
      id: "1",
      name: "Court A",
      type: "Indoor",
      status: "active",
      price: "400/hr",
      bookings: 45,
      revenue: "18,000",
    },
    {
      id: "2",
      name: "Court B",
      type: "Indoor",
      status: "maintenance",
      price: "400/hr",
      bookings: 38,
      revenue: "15,200",
    },
  ];

  const renderOverview = () => (
    <Stack>
      {/* Stats Cards */}
      {/* <Grid>
        {venueStats.map((stat, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card p="md" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <ThemeIcon
                  size="lg"
                  radius="md"
                  variant="light"
                  color={stat.color}
                >
                  <stat.icon size={20} />
                </ThemeIcon>
                <Badge
                  variant="light"
                  color={stat.change.startsWith("+") ? "green" : "red"}
                >
                  {stat.change}
                </Badge>
              </Group>
              <Text fw={700} size="xl">
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed">
                {stat.title}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid> */}

      {/* Venue Information */}
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={4}>Venue Information</Title>
            <Text size="sm" c="dimmed">
              {getVenue.data?.name}
            </Text>
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
              <Text size="sm">{getVenue.data?.address}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Group gap="xs">
                <IconClock size={16} />
                <Text fw={500}>Operating Hours</Text>
              </Group>
              <Text size="sm">
                {getVenue.data?.open_time
                  ? format(getVenue.data.open_time, "E")
                  : "N/A"}{" "}
                -{" "}
                {getVenue.data?.close_time
                  ? format(getVenue.data.close_time, "E")
                  : "N/A"}
                {": "}
                {getVenue.data?.open_time
                  ? format(getVenue.data.open_time, "HH:mm")
                  : "N/A"}
                -{" "}
                {getVenue.data?.close_time
                  ? format(getVenue.data.close_time, "HH:mm")
                  : "N/A"}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Courts List */}
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={4}>Courts Management</Title>
            <Text size="sm" c="dimmed">
              {getVenue.data?.name}
            </Text>
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
                <Table.Td>{court.status}</Table.Td>
                <Table.Td>
                  <Badge color={court.status === "active" ? "green" : "orange"}>
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
                        <Menu.Item leftSection={<IconEdit size={14} />}>
                          Edit Court
                        </Menu.Item>
                        <Menu.Item leftSection={<IconSettings size={14} />}>
                          Court Settings
                        </Menu.Item>
                        <Menu.Item leftSection={<IconChartBar size={14} />}>
                          View Analytics
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          color="red"
                          leftSection={<IconX size={14} />}
                        >
                          Disable Court
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

  const renderSettings = () => (
    <Stack>
      <Paper p="md" withBorder>
        <Title order={4} mb="md">
          Venue Settings
        </Title>
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <TextInput label="Venue Name" defaultValue="Sports Complex A" />
              <Textarea
                label="Description"
                defaultValue="Professional badminton facility with 8 courts"
              />
              <TimeInput label="Opening Time" defaultValue="07:00" />
              <TimeInput label="Closing Time" defaultValue="22:00" />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <TextInput label="Phone Number" defaultValue="+66812345678" />
              <TextInput
                label="Email"
                defaultValue="contact@sportscomplex.com"
              />
              <Switch label="Allow Online Bookings" defaultChecked />
              <Switch label="Auto-confirm Bookings" defaultChecked />
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );

  return (
    <Container fluid>
      <Stack>
        {/* Header */}
        <Paper p="md" withBorder>
          <Group justify="space-between">
            <div>
              <Title order={2}>Venue Management</Title>
              <Text c="dimmed">{getVenue.data?.name}</Text>
            </div>
          </Group>
        </Paper>

        {/* Main Content */}
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="md">
            {renderOverview()}
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="md">
            {renderSettings()}
          </Tabs.Panel>
        </Tabs>
      </Stack>

      {/* Edit Venue Modal */}
      <Modal
        opened={editVenueOpen}
        onClose={() => setEditVenueOpen(false)}
        title="Edit Venue Details"
        size="lg"
      >
        {getVenue.data && (
          <VenueForm
            type="edit"
            data={{
              ...getVenue.data,
              name: getVenue.data?.name ?? "",
              description: getVenue.data?.description ?? "",
              address: getVenue.data?.address ?? "",
              location: getVenue.data?.location ?? "",
              phone: getVenue.data?.phone ?? "",
              email: getVenue.data?.email ?? "",
              image_urls: getVenue.data?.image_urls ?? "",
              status: getVenue.data?.status ?? "",
              open_time: format(getVenue.data?.open_time ?? "", "HH:mm"),
              close_time: format(getVenue.data?.close_time ?? "", "HH:mm"),
            }}
          />
        )}
      </Modal>

      {/* Add Court Modal */}
      <Modal
        opened={addCourtOpen}
        onClose={() => setAddCourtOpen(false)}
        title="Add New Court"
      >
        <Stack>
          <TextInput label="Court Name" required />
          <Select
            label="Court Type"
            data={[
              { value: "indoor", label: "Indoor" },
              { value: "outdoor", label: "Outdoor" },
            ]}
            required
          />
          <TextInput label="Price per Hour" type="number" required />
          <Textarea label="Description" />
          <FileInput label="Court Photos" multiple />
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setAddCourtOpen(false)}>
              Cancel
            </Button>
            <Button>Add Court</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
