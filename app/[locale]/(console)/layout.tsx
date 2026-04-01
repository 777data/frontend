"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Code, Group, Text } from '@mantine/core';
import classes from './layout.module.css';

const data = [
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

type Props = {
  children: ReactNode;
};

export default function ConsoleLayout({ children }: Props) {
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={classes.link}
      aria-label={item.label}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} aria-hidden />
      <span className={classes.linkLabel}>{item.label}</span>
    </a>
  ));

  return (
    <div className={classes.shell}>
      <nav className={classes.navbar} aria-label="Console">
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between" wrap="nowrap">
            <Text component="span" fw={800} size="lg" className={classes.brandFull}>
              Urblink
            </Text>
            <Text component="span" className={classes.brandShort} aria-hidden>
              U
            </Text>
            <Code fw={700} className={classes.versionBadge}>
              v3.1.2
            </Code>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            aria-label="Change account"
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} aria-hidden />
            <span className={classes.linkLabel}>Change account</span>
          </a>

          <a
            href="#"
            className={classes.link}
            aria-label="Logout"
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} aria-hidden />
            <span className={classes.linkLabel}>Logout</span>
          </a>
        </div>
      </nav>

      <main className={classes.main}>{children}</main>
    </div>
  );
}