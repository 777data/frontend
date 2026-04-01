"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
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
  const theme = useMantineTheme();
  const [active, setActive] = useState("dashboard");
  const [opened, { toggle, close }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = { name: "David", image: "" };

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

      <main className={classes.main}>
        <div className={classes.rightHeader}>
          <Container className={classes.rightHeaderMain} size="lg">
            <Group justify="flex-end">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                aria-label="Toggle navigation"
              />

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
                  <Menu.Item leftSection={<IconHeart size={16} color={theme.colors.red[6]} stroke={1.5} />}>
                    Liked posts
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />}
                  >
                    Saved posts
                  </Menu.Item>
                  <Menu.Item leftSection={<IconMessage size={16} color={theme.colors.blue[6]} stroke={1.5} />}>
                    Your comments
                  </Menu.Item>

                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                    Account settings
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}>
                    Change account
                  </Menu.Item>
                  <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>Logout</Menu.Item>

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item leftSection={<IconPlayerPause size={16} stroke={1.5} />}>
                    Pause subscription
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
                    Delete account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Container>
        </div>

        <Drawer
          opened={opened}
          onClose={close}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px)" mx="-md">
            <Divider my="sm" />
            {data.map((item) => (
              <a
                href="#"
                key={item.key}
                className={classes.drawerLink}
                onClick={(event) => event.preventDefault()}
              >
                {t(`menu.${item.key}`)}
              </a>
            ))}
          </ScrollArea>
        </Drawer>

        <div className={classes.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}