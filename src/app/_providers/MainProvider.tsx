"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import '@mantine/dates/styles.css';
import "@mantine/core/styles.css";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const theme = createTheme({});

export default function MainProvider({ children }: Props) {
  return (
    <SessionProvider>
      <MantineProvider theme={theme}>{children}</MantineProvider>;
    </SessionProvider>
  );
}
