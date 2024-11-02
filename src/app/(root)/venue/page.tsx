'use client'

import React, { useState } from 'react';
import {
    Container, Stack, Paper, Title, Text, Group, Grid, Card,
    ActionIcon, Button, Badge, Table, Avatar, Modal, TextInput,
    Select, Textarea, FileInput, Switch, ThemeIcon,
    Menu, Tabs
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import {
    IconEdit, IconTrash, IconPlus, IconPhoto, IconMapPin,
    IconClock, IconSettings, IconChartBar, IconUsers, IconAlertCircle,
    IconCalendarEvent, IconBuilding, IconChevronRight, IconDotsVertical,
    IconCheck, IconX
} from '@tabler/icons-react';

const VenueManagement = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [editVenueOpen, setEditVenueOpen] = useState(false);
    const [addCourtOpen, setAddCourtOpen] = useState(false);

    // Sample data
    const venueStats = [
        { title: 'Today\'s Bookings', value: '24', change: '+12%', icon: IconCalendarEvent, color: 'blue' },
        { title: 'Active Courts', value: '8', change: '0%', icon: IconBuilding, color: 'green' },
        { title: 'Total Revenue', value: '฿12,450', change: '+8%', icon: IconChartBar, color: 'violet' },
        { title: 'Court Utilization', value: '75%', change: '+5%', icon: IconUsers, color: 'orange' },
    ];

    const courts = [
        {
            id: '1',
            name: 'Court A',
            type: 'Indoor',
            status: 'active',
            price: '400/hr',
            bookings: 45,
            revenue: '18,000',
        },
        {
            id: '2',
            name: 'Court B',
            type: 'Indoor',
            status: 'maintenance',
            price: '400/hr',
            bookings: 38,
            revenue: '15,200',
        }
    ];

    const renderOverview = () => (
        <Stack>
            {/* Stats Cards */}
            <Grid>
                {venueStats.map((stat, index) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                        <Card p="md" radius="md" withBorder>
                            <Group justify="space-between" mb="xs">
                                <ThemeIcon size="lg" radius="md" variant="light" color={stat.color}>
                                    <stat.icon size={20} />
                                </ThemeIcon>
                                <Badge variant="light" color={stat.change.startsWith('+') ? 'green' : 'red'}>
                                    {stat.change}
                                </Badge>
                            </Group>
                            <Text fw={700} size="xl">{stat.value}</Text>
                            <Text size="sm" c="dimmed">{stat.title}</Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Venue Information */}
            <Paper p="md" withBorder>
                <Group justify="space-between" mb="md">
                    <div>
                        <Title order={4}>Venue Information</Title>
                        <Text size="sm" c="dimmed">Basic details about your venue</Text>
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
                            <Text size="sm">123 Sports Complex, Bangkok 10110</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack gap="xs">
                            <Group gap="xs">
                                <IconClock size={16} />
                                <Text fw={500}>Operating Hours</Text>
                            </Group>
                            <Text size="sm">Mon-Sun: 7:00 - 22:00</Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Paper>

            {/* Courts List */}
            <Paper p="md" withBorder>
                <Group justify="space-between" mb="md">
                    <div>
                        <Title order={4}>Courts Management</Title>
                        <Text size="sm" c="dimmed">Manage your badminton courts</Text>
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
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Total Bookings</Table.Th>
                            <Table.Th>Revenue</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {courts.map((court) => (
                            <Table.Tr key={court.id}>
                                <Table.Td>
                                    <Text fw={500}>{court.name}</Text>
                                </Table.Td>
                                <Table.Td>{court.type}</Table.Td>
                                <Table.Td>
                                    <Badge
                                        color={court.status === 'active' ? 'green' : 'orange'}
                                    >
                                        {court.status}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>{court.price}</Table.Td>
                                <Table.Td>{court.bookings}</Table.Td>
                                <Table.Td>฿{court.revenue}</Table.Td>
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
                <Title order={4} mb="md">Venue Settings</Title>
                <Grid>
                    <Grid.Col span={6}>
                        <Stack>
                            <TextInput
                                label="Venue Name"
                                defaultValue="Sports Complex A"
                            />
                            <Textarea
                                label="Description"
                                defaultValue="Professional badminton facility with 8 courts"
                            />
                            <TimeInput
                                label="Opening Time"
                                defaultValue="07:00"
                            />
                            <TimeInput
                                label="Closing Time"
                                defaultValue="22:00"
                            />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack>
                            <TextInput
                                label="Phone Number"
                                defaultValue="+66812345678"
                            />
                            <TextInput
                                label="Email"
                                defaultValue="contact@sportscomplex.com"
                            />
                            <Switch
                                label="Allow Online Bookings"
                                defaultChecked
                            />
                            <Switch
                                label="Auto-confirm Bookings"
                                defaultChecked
                            />
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
                            <Text c="dimmed">Manage your venue and courts</Text>
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
                <Stack>
                    <TextInput label="Venue Name" />
                    <Textarea label="Description" />
                    <FileInput label="Venue Photos" multiple placeholder="Upload photos" />
                    <TextInput label="Address" />
                    <Grid>
                        <Grid.Col span={6}>
                            <TimeInput label="Opening Time" />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TimeInput label="Closing Time" />
                        </Grid.Col>
                    </Grid>
                    <Group justify="flex-end">
                        <Button variant="light" onClick={() => setEditVenueOpen(false)}>Cancel</Button>
                        <Button>Save Changes</Button>
                    </Group>
                </Stack>
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
                            { value: 'indoor', label: 'Indoor' },
                            { value: 'outdoor', label: 'Outdoor' }
                        ]}
                        required
                    />
                    <TextInput
                        label="Price per Hour"
                        type="number"
                        required
                    />
                    <Textarea label="Description" />
                    <FileInput label="Court Photos" multiple />
                    <Group justify="flex-end">
                        <Button variant="light" onClick={() => setAddCourtOpen(false)}>Cancel</Button>
                        <Button>Add Court</Button>
                    </Group>
                </Stack>
            </Modal>
        </Container>
    );
};

export default VenueManagement;