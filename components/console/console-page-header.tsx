"use client";

import Link from "next/link";
import { Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { CreatePostModal } from "@/components/console/create-post-modal";
import {
  findConsoleMenuItemForPath,
  resolveMenuAction,
  type ConsoleMenuAction,
} from "@/components/console/console-menu.config";
import classes from "./console-page-header.module.css";

type PageHeader = {
  title: string;
  subtitle: string;
  action?: ConsoleMenuAction;
};

type Props = {
  normalizedPathname: string;
  authorName: string;
  authorImage?: string;
};

export function ConsolePageHeader({ normalizedPathname, authorName, authorImage }: Props) {
  const t = useTranslations("ConsoleLayout");
  const [createPostOpened, createPostHandlers] = useDisclosure(false);

  const menuItem = findConsoleMenuItemForPath(normalizedPathname);

  const pageHeader: PageHeader = menuItem
    ? {
        title: t(menuItem.title),
        subtitle: t(menuItem.subtitle),
        action: resolveMenuAction(menuItem.action, t),
      }
    : {
        title: t("menu.dashboard"),
        subtitle: t("pageSubtitles.fallback"),
      };

  return (
    <>
      <Group className={classes.pageHeader} justify="space-between" align="flex-end">
        <div>
          <Text className={classes.pageTitle}>{pageHeader.title}</Text>
          <Text className={classes.pageSubtitle}>{pageHeader.subtitle}</Text>
        </div>
        {pageHeader.action ? (
          pageHeader.action.kind === "link" ? (
            <Button component={Link} href={pageHeader.action.href}>
              {pageHeader.action.label}
            </Button>
          ) : (
            <Button onClick={createPostHandlers.open}>{pageHeader.action.label}</Button>
          )
        ) : null}
      </Group>

      <CreatePostModal
        opened={createPostOpened}
        onClose={createPostHandlers.close}
        authorName={authorName}
        authorImage={authorImage}
        onPublish={(payload) => {
          window.dispatchEvent(new CustomEvent("urblink:publication-created", { detail: payload }));
        }}
      />
    </>
  );
}
