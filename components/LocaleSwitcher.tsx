"use client";

import { SegmentedControl } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

export function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();

  return (
    <SegmentedControl
      aria-label={t("aria")}
      size="xs"
      disabled={isPending}
      value={locale}
      onChange={(value: AppLocale) => {
        startTransition(() => {
          router.replace(pathname, { locale: value });
        });
      }}
      data={[
        { label: "FR", value: "fr" },
        { label: "EN", value: "en" },
      ]}
    />
  );
}
