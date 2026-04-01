"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconAlertTriangle,
  IconChevronDown,
  IconCalendarEvent,
  IconChecklist,
  IconClipboardText,
  IconFlag,
  IconHeart,
  IconLayoutDashboard,
  IconLogout,
  IconMessage,
  IconMessageCircle,
  IconNews,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons-react';
import {
  Avatar,
  Button,
  Burger,
  Container,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  Tabs,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import classes from './layout.module.css';

const data = [
  { link: '/', key: 'dashboard', icon: IconLayoutDashboard },
  { link: '/citizen-alerts', key: 'citizenAlerts', icon: IconAlertTriangle },
  { link: '/agenda', key: 'agenda', icon: IconCalendarEvent },
  { link: '/consultations', key: 'consultations', icon: IconClipboardText },
  { link: '/messaging', key: 'messaging', icon: IconMessageCircle },
  { link: '/publications', key: 'publications', icon: IconNews },
  { link: '/reports', key: 'reports', icon: IconFlag },
  { link: '/my-tasks', key: 'myTasks', icon: IconChecklist },
];

type Props = {
  children: ReactNode;
};

export default function ConsoleLayout({ children }: Props) {
  const t = useTranslations("ConsoleLayout");
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = { name: "David", image: "" };
  const pathname = usePathname();

  const localePrefixPattern = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);
  const normalizedPathname = pathname.replace(localePrefixPattern, "") || "/";
  const settingsPath = "/account/settings";

  const rightMenuItems = [
    {
      key: "liked-posts",
      href: "/account/liked-posts",
      label: "Liked posts",
      icon: <IconHeart size={16} color={theme.colors.red[6]} stroke={1.5} />,
    },
    {
      key: "saved-posts",
      href: "/account/saved-posts",
      label: "Saved posts",
      icon: <IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />,
    },
    {
      key: "comments",
      href: "/account/comments",
      label: "Your comments",
      icon: <IconMessage size={16} color={theme.colors.blue[6]} stroke={1.5} />,
    },
    {
      key: "settings",
      href: "/account/settings",
      label: "Account settings",
      icon: <IconSettings size={16} stroke={1.5} />,
    },
    {
      key: "switch-account",
      href: "/account/switch-account",
      label: "Change account",
      icon: <IconSwitchHorizontal size={16} stroke={1.5} />,
    },
    {
      key: "logout",
      href: "/account/logout",
      label: "Logout",
      icon: <IconLogout size={16} stroke={1.5} />,
    },
    {
      key: "pause-subscription",
      href: "/account/pause-subscription",
      label: "Pause subscription",
      icon: <IconPlayerPause size={16} stroke={1.5} />,
    },
    {
      key: "delete-account",
      href: "/account/delete-account",
      label: "Delete account",
      icon: <IconTrash size={16} stroke={1.5} />,
    },
  ] as const;

  const links = data.map((item) => (
    <Link
      className={classes.link}
      aria-label={t(`menu.${item.key}`)}
      data-active={normalizedPathname === item.link || undefined}
      href={item.link as `/${string}`}
      key={item.key}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} aria-hidden />
      <span className={classes.linkLabel}>{t(`menu.${item.key}`)}</span>
    </Link>
  ));

  const sectionHeaderMap: Record<
    string,
    { title: string; subtitle: string; action?: { label: string; href: `/${string}` } }
  > = {
    "/": {
      title: t("menu.dashboard"),
      subtitle: "Vue d'ensemble de votre activité et des indicateurs clés.",
      action: { label: "Créer une alerte", href: "/citizen-alerts" },
    },
    "/citizen-alerts": {
      title: t("menu.citizenAlerts"),
      subtitle: "Suivez et traitez les alertes signalées par les citoyens.",
    },
    "/agenda": {
      title: t("menu.agenda"),
      subtitle: "Planifiez vos événements et échéances à venir.",
      action: { label: "Nouvel événement", href: "/agenda" },
    },
    "/consultations": {
      title: t("menu.consultations"),
      subtitle: "Centralisez les consultations en cours et leur progression.",
    },
    "/messaging": {
      title: t("menu.messaging"),
      subtitle: "Retrouvez vos échanges et conversations récentes.",
    },
    "/publications": {
      title: t("menu.publications"),
      subtitle: "Gérez vos publications et suivez leur diffusion.",
      action: { label: "Nouvelle publication", href: "/publications" },
    },
    "/reports": {
      title: t("menu.reports"),
      subtitle: "Analysez les signalements et priorisez les actions.",
    },
    "/my-tasks": {
      title: t("menu.myTasks"),
      subtitle: "Visualisez les tâches assignées et leur statut.",
    },
    "/account/settings": {
      title: t("footer.settings"),
      subtitle: "Configurez vos préférences et paramètres de compte.",
    },
  };

  const accountMenuItem = rightMenuItems.find((item) => item.href === normalizedPathname);
  const pageHeader = accountMenuItem
    ? {
        title: accountMenuItem.label,
        subtitle: "Gérez les informations et actions liées à ce menu.",
      }
    : (sectionHeaderMap[normalizedPathname] ?? {
        title: t("menu.dashboard"),
        subtitle: "Consultez et pilotez les éléments de votre espace console.",
      });

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
            href={settingsPath}
            className={classes.link}
            aria-label={t("footer.settings")}
            data-active={normalizedPathname === settingsPath || undefined}
          >
            <IconSettings className={classes.linkIcon} stroke={1.5} aria-hidden />
            <span className={classes.linkLabel}>{t("footer.settings")}</span>
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
                  {rightMenuItems.slice(0, 3).map((item) => (
                    <Menu.Item
                      key={item.key}
                      component={Link}
                      href={item.href as `/${string}`}
                      leftSection={item.icon}
                      className={classes.userMenuItem}
                      data-active={normalizedPathname === item.href || undefined}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}

                  <Menu.Label>Settings</Menu.Label>
                  {rightMenuItems.slice(3, 6).map((item) => (
                    <Menu.Item
                      key={item.key}
                      component={Link}
                      href={item.href as `/${string}`}
                      leftSection={item.icon}
                      className={classes.userMenuItem}
                      data-active={normalizedPathname === item.href || undefined}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  {rightMenuItems.slice(6).map((item) => (
                    <Menu.Item
                      key={item.key}
                      component={Link}
                      href={item.href as `/${string}`}
                      leftSection={item.icon}
                      className={classes.userMenuItem}
                      data-active={normalizedPathname === item.href || undefined}
                      color={item.key === "delete-account" ? "red" : undefined}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Container>
        </div>

        <div className={classes.contentArea}>
          <Group className={classes.pageHeader} justify="space-between" align="flex-end">
            <div>
              <Text className={classes.pageTitle}>{pageHeader.title}</Text>
              <Text className={classes.pageSubtitle}>{pageHeader.subtitle}</Text>
            </div>
            {pageHeader.action ? (
              <Button component={Link} href={pageHeader.action.href}>
                {pageHeader.action.label}
              </Button>
            ) : null}
          </Group>

          {children}
        </div>
      </main>
    </div>
  );
}