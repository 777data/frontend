"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import {
  IconAlertTriangle,
  IconCalendarEvent,
  IconChecklist,
  IconClipboardText,
  IconFlag,
  IconLayoutDashboard,
  IconMessageCircle,
  IconNews,
  IconSettings,
} from '@tabler/icons-react';
import { Code, Group, Text } from '@mantine/core';
import { useTranslations } from "next-intl";
import classes from './layout.module.css';

const data = [
  { link: '', key: 'dashboard', icon: IconLayoutDashboard },
  { link: '', key: 'citizenAlerts', icon: IconAlertTriangle },
  { link: '', key: 'agenda', icon: IconCalendarEvent },
  { link: '', key: 'consultations', icon: IconClipboardText },
  { link: '', key: 'messaging', icon: IconMessageCircle },
  { link: '', key: 'publications', icon: IconNews },
  { link: '', key: 'reports', icon: IconFlag },
  { link: '', key: 'myTasks', icon: IconChecklist },
];

type Props = {
  children: ReactNode;
};

export default function ConsoleLayout({ children }: Props) {
  const t = useTranslations("ConsoleLayout");
  const [active, setActive] = useState("dashboard");

  const links = data.map((item) => (
    <a
      className={classes.link}
      aria-label={t(`menu.${item.key}`)}
      data-active={item.key === active || undefined}
      href={item.link}
      key={item.key}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.key);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} aria-hidden />
      <span className={classes.linkLabel}>{t(`menu.${item.key}`)}</span>
    </a>
  ));

  return (
    <div className={classes.shell}>
      <nav className={classes.navbar} aria-label="Console">
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between" wrap="nowrap">
            <Image
              src="/urblink.png"
              alt="Urblink"
              width={120}
              height={32}
              className={classes.brandFull}
            />
            <Image
              src="/logo.png"
              alt=""
              aria-hidden
              width={36}
              height={36}
              className={classes.brandShort}
            />
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            aria-label={t("footer.settings")}
            onClick={(event) => event.preventDefault()}
          >
            <IconSettings className={classes.linkIcon} stroke={1.5} aria-hidden />
            <span className={classes.linkLabel}>{t("footer.settings")}</span>
          </a>
        </div>
      </nav>

      <main className={classes.main}>{children}</main>
    </div>
  );
}