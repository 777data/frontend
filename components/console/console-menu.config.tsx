import type { MantineTheme } from "@mantine/core";
import {
  IconAlertTriangle,
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
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

export type ConsoleTablerIcon = TablerIcon;

export type ConsoleMenuAction =
  | { kind: "link"; label: string; href: `/${string}` }
  | { kind: "postDialog"; label: string };

/** Config d’action : label = clé i18n ConsoleLayout */
export type ConsoleMenuActionConfig =
  | { kind: "link"; label: string; href: `/${string}` }
  | { kind: "postDialog"; label: string };

export type ConsoleMenuItem = {
  link: `/${string}`;
  key: string;
  icon: ConsoleTablerIcon;
  /** Clé i18n ConsoleLayout, ex. menu.dashboard */
  title: string;
  /** Clé i18n ConsoleLayout, ex. pageSubtitles.dashboard */
  subtitle: string;
  /** Clés i18n des libellés de bouton (namespace ConsoleLayout) */
  action?: ConsoleMenuActionConfig;
};

export const consoleMainMenuItems: ConsoleMenuItem[] = [
  {
    link: "/",
    key: "dashboard",
    icon: IconLayoutDashboard,
    title: "menu.dashboard",
    subtitle: "pageSubtitles.dashboard",
    action: { kind: "link", label: "pageActions.createAlert", href: "/citizen-alerts" },
  },
  {
    link: "/citizen-alerts",
    key: "citizenAlerts",
    icon: IconAlertTriangle,
    title: "menu.citizenAlerts",
    subtitle: "pageSubtitles.citizenAlerts",
  },
  {
    link: "/agenda",
    key: "agenda",
    icon: IconCalendarEvent,
    title: "menu.agenda",
    subtitle: "pageSubtitles.agenda",
    action: { kind: "link", label: "pageActions.newEvent", href: "/agenda" },
  },
  {
    link: "/consultations",
    key: "consultations",
    icon: IconClipboardText,
    title: "menu.consultations",
    subtitle: "pageSubtitles.consultations",
  },
  {
    link: "/messaging",
    key: "messaging",
    icon: IconMessageCircle,
    title: "menu.messaging",
    subtitle: "pageSubtitles.messaging",
  },
  {
    link: "/publications",
    key: "publications",
    icon: IconNews,
    title: "menu.publications",
    subtitle: "pageSubtitles.publications",
    action: { kind: "postDialog", label: "postDialog.actionButton" },
  },
  {
    link: "/reports",
    key: "reports",
    icon: IconFlag,
    title: "menu.reports",
    subtitle: "pageSubtitles.reports",
  },
  {
    link: "/my-tasks",
    key: "myTasks",
    icon: IconChecklist,
    title: "menu.myTasks",
    subtitle: "pageSubtitles.myTasks",
  },
];

/** Lien Paramètres dans la barre latérale (même route que le compte → en-tête = Paramétrage) */
export const consoleFooterMenuItem: ConsoleMenuItem = {
  link: "/account/settings",
  key: "footerSettings",
  icon: IconSettings,
  title: "footer.settings",
  subtitle: "pageSubtitles.accountSettings",
};

export type AccountMenuGroup = "activity" | "settings" | "danger";

export type ConsoleAccountMenuItem = ConsoleMenuItem & {
  group: AccountMenuGroup;
  /** Teinte d’icône dans le menu utilisateur (palette Mantine) */
  iconTint?: { color: keyof MantineTheme["colors"]; shade: number };
};

export const consoleAccountMenuItems: ConsoleAccountMenuItem[] = [
  {
    group: "activity",
    link: "/account/liked-posts",
    key: "liked-posts",
    icon: IconHeart,
    title: "userMenu.likedPosts",
    subtitle: "pageSubtitles.accountMenu",
    iconTint: { color: "red", shade: 6 },
  },
  {
    group: "activity",
    link: "/account/saved-posts",
    key: "saved-posts",
    icon: IconStar,
    title: "userMenu.savedPosts",
    subtitle: "pageSubtitles.accountMenu",
    iconTint: { color: "yellow", shade: 6 },
  },
  {
    group: "activity",
    link: "/account/comments",
    key: "comments",
    icon: IconMessage,
    title: "userMenu.yourComments",
    subtitle: "pageSubtitles.accountMenu",
    iconTint: { color: "blue", shade: 6 },
  },
  {
    group: "settings",
    link: "/account/settings",
    key: "account-settings",
    icon: IconSettings,
    title: "userMenu.accountSettings",
    subtitle: "pageSubtitles.accountMenu",
  },
  {
    group: "settings",
    link: "/account/switch-account",
    key: "switch-account",
    icon: IconSwitchHorizontal,
    title: "userMenu.changeAccount",
    subtitle: "pageSubtitles.accountMenu",
  },
  {
    group: "settings",
    link: "/account/logout",
    key: "logout",
    icon: IconLogout,
    title: "userMenu.logout",
    subtitle: "pageSubtitles.accountMenu",
  },
  {
    group: "danger",
    link: "/account/pause-subscription",
    key: "pause-subscription",
    icon: IconPlayerPause,
    title: "userMenu.pauseSubscription",
    subtitle: "pageSubtitles.accountMenu",
  },
  {
    group: "danger",
    link: "/account/delete-account",
    key: "delete-account",
    icon: IconTrash,
    title: "userMenu.deleteAccount",
    subtitle: "pageSubtitles.accountMenu",
  },
];

const mainByLink = new Map(consoleMainMenuItems.map((item) => [item.link, item]));

export function findConsoleMenuItemForPath(
  pathname: string,
): ConsoleMenuItem | ConsoleAccountMenuItem | undefined {
  const main = mainByLink.get(pathname as `/${string}`);
  if (main) return main;
  /* Même route que le menu compte : l’en-tête suit le lien footer (Paramétrage). */
  if (pathname === consoleFooterMenuItem.link) return consoleFooterMenuItem;
  return consoleAccountMenuItems.find((item) => item.link === pathname);
}

export function resolveMenuAction(
  action: ConsoleMenuActionConfig | undefined,
  t: (key: string) => string,
): ConsoleMenuAction | undefined {
  if (!action) return undefined;
  if (action.kind === "link") {
    return { kind: "link", label: t(action.label), href: action.href };
  }
  return { kind: "postDialog", label: t(action.label) };
}
