"use client";

import { ActionIcon, Button, Menu, rem } from "@mantine/core";
import {
  IconChevronRight,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";

export default function AccountNavbarMenu() {
  const { data } = useSession();

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
          <div className="flex h-full w-full items-center justify-center bg-blue-100">
            <IconUserCircle size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{data?.user.name}</div>
          <div className="text-xs text-gray-500">{data?.user.email}</div>
        </div>
        <div className="group relative">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="light">
                <IconChevronRight size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Settings
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* <button className="rounded p-1 hover:bg-gray-100">
            <IconChevronRight size={16} />
          </button>
          <div className="absolute right-0 top-full mt-2 hidden w-48 rounded-md border border-gray-200 bg-white shadow-lg group-hover:block">
            <div className="py-1">
              <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100">
                <IconUserCircle size={14} />
                Profile
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100">
                <IconSettings size={14} />
                Settings
              </button>
              <div className="my-1 border-t border-gray-200"></div>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                <IconLogout size={14} />
                Logout
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
