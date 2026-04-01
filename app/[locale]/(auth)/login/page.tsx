"use client";

import {
  Alert,
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
import { useActionState, useMemo } from "react";
import { loginAction, type LoginErrorCode } from "@/actions/auth";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import classes from "./login.module.css";

function loginErrorMessageKey(
  code: LoginErrorCode,
): "emptyFields" | "invalidCredentials" | "apiUnavailable" | "apiError" {
  switch (code) {
    case "EMPTY_FIELDS":
      return "emptyFields";
    case "INVALID_CREDENTIALS":
      return "invalidCredentials";
    case "API_UNAVAILABLE":
      return "apiUnavailable";
    case "API_ERROR":
      return "apiError";
    default: {
      const _x: never = code;
      return _x;
    }
  }
}

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const errorMessage = useMemo(() => {
    if (!state || state.ok) {
      return null;
    }
    const key = loginErrorMessageKey(state.error);
    return t(`errors.${key}`);
  }, [state, t]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.formColumn}>
        <div className={classes.toolbar}>
          <LocaleSwitcher />
        </div>
        <Paper className={classes.form} component="form" action={formAction}>
          <Title order={2} className={classes.title}>
            {t("title")}
          </Title>

          {errorMessage ? (
            <Alert color="red" variant="light" mb="md">
              {errorMessage}
            </Alert>
          ) : null}

          <TextInput
            name="email"
            type="email"
            autoComplete="email"
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            size="md"
            radius="md"
            required
            disabled={isPending}
          />
          <PasswordInput
            name="password"
            autoComplete="current-password"
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
            mt="md"
            size="md"
            radius="md"
            required
            disabled={isPending}
          />
          <Checkbox
            name="remember"
            label={t("keepLoggedIn")}
            mt="xl"
            size="md"
            disabled={isPending}
          />
          <Button type="submit" fullWidth mt="xl" size="md" radius="md" loading={isPending}>
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
