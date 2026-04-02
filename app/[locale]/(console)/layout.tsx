"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronDown } from '@tabler/icons-react';
import type { MantineTheme } from "@mantine/core";
import {
  Avatar,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useTranslations } from "next-intl";
import {
  consoleAccountMenuItems,
  consoleFooterMenuItem,
  consoleMainMenuItems,
  type ConsoleAccountMenuItem,
} from "@/components/console/console-menu.config";
import { ConsolePageHeader } from "@/components/console/console-page-header";
import { routing } from "@/i18n/routing";
import classes from './layout.module.css';

type Props = {
  children: ReactNode;
};

function accountMenuIconProps(item: ConsoleAccountMenuItem, theme: MantineTheme) {
  if (!item.iconTint) return {};
  const tones = theme.colors[item.iconTint.color];
  return { color: tones[item.iconTint.shade] };
}

export default function ConsoleLayout({ children }: Props) {
  const t = useTranslations("ConsoleLayout");
  const theme = useMantineTheme();
  const FooterNavIcon = consoleFooterMenuItem.icon;
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = { name: "David", image: "" };
  const pathname = usePathname();

  const localePrefixPattern = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);
  const normalizedPathname = pathname.replace(localePrefixPattern, "") || "/";

  const activityItems = consoleAccountMenuItems.filter((i) => i.group === "activity");
  const settingsItems = consoleAccountMenuItems.filter((i) => i.group === "settings");
  const dangerItems = consoleAccountMenuItems.filter((i) => i.group === "danger");

  const links = consoleMainMenuItems.map((item) => (
    <Link
      className={classes.link}
      aria-label={t(item.title)}
      data-active={normalizedPathname === item.link || undefined}
      href={item.link}
      key={item.key}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} aria-hidden />
      <span className={classes.linkLabel}>{t(item.title)}</span>
    </Link>
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
          <Link
            href={consoleFooterMenuItem.link}
            className={classes.link}
            aria-label={t(consoleFooterMenuItem.title)}
            data-active={normalizedPathname === consoleFooterMenuItem.link || undefined}
          >
            <FooterNavIcon className={classes.linkIcon} stroke={1.5} aria-hidden />
            <span className={classes.linkLabel}>{t(consoleFooterMenuItem.title)}</span>
          </Link>
        </div>
      </nav>

      <main className={classes.main}>
        <div className={classes.rightHeader}>
          <Container className={classes.rightHeaderMain} size="lg">
            <Group justify="flex-end">
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: "pop-top-right" }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={`${classes.user} ${userMenuOpened ? classes.userActive : ""}`}
                  >
                    <Group gap={7}>
                      <Avatar src={user.image || undefined} alt={user.name} radius="xl" size={20} />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {user.name}
                      </Text>
                      <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {activityItems.map((item) => (
                    <Menu.Item
                      key={item.key}
                      component={Link}
                      href={item.link}
                      leftSection={<item.icon size={16} stroke={1.5} {...accountMenuIconProps(item, theme)} />}
                      className={classes.userMenuItem}
                      data-active={normalizedPathname === item.link || undefined}
                    >
                      {t(item.title)}
                    </Menu.Item>
                  ))}

                  <Menu.Label>{t("userMenuGroup.settings")}</Menu.Label>
                  {settingsItems.map((item) => (
                    <Menu.Item
                      key={item.key}
                      component={Link}
                      href={item.link}
                      leftSection={<item.icon size={16} stroke={1.5} {...accountMenuIconProps(item, theme)} />}
                      className={classes.userMenuItem}
                      data-active={normalizedPathname === item.link || undefined}
                    >
                      {t(item.title)}
                    </Menu.Item>
                  ))}

                  <Menu.Divider />

                  <Menu.Label>{t("userMenuGroup.danger")}</Menu.Label>
                  {dangerItems.map((item) => (
                    <Menu.Item
                      key={item.key}
                      component={Link}
                      href={item.link}
                      leftSection={<item.icon size={16} stroke={1.5} {...accountMenuIconProps(item, theme)} />}
                      className={classes.userMenuItem}
                      data-active={normalizedPathname === item.link || undefined}
                      color={item.key === "delete-account" ? "red" : undefined}
                    >
                      {t(item.title)}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Container>
        </div>

        <div className={classes.contentArea}>
          <ConsolePageHeader
            normalizedPathname={normalizedPathname}
            authorName={user.name}
            authorImage={user.image}
          />

          {children}
        </div>
      </main>
    </div>
  );
}
