"use client";

import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import classes from "./login.module.css";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <div className={classes.wrapper}>
      <div className={classes.formColumn}>
        <div className={classes.toolbar}>
          <LocaleSwitcher />
        </div>
        <Paper className={classes.form}>
          <Title order={2} className={classes.title}>
            {t("title")}
          </Title>

          <TextInput
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            size="md"
            radius="md"
          />
          <PasswordInput
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
            mt="md"
            size="md"
            radius="md"
          />
          <Checkbox label={t("keepLoggedIn")} mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" radius="md">
            {t("submit")}
          </Button>

          <Text ta="center" mt="md">
            {t("noAccount")}{" "}
            <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
              {t("register")}
            </Anchor>
          </Text>
        </Paper>
      </div>
      <div className={classes.imageColumn} aria-hidden />
    </div>
  );
}
