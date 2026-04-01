"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export type LoginActionState =
  | { ok: false; error: LoginErrorCode }
  | { ok: true }
  | null;

export type LoginErrorCode =
  | "EMPTY_FIELDS"
  | "INVALID_CREDENTIALS"
  | "API_UNAVAILABLE"
  | "API_ERROR";

type AuthResult = { ok: true } | { ok: false; error: LoginErrorCode };

/**
 * Mock en développement. En production, définir AUTH_API_URL et implémenter l’appel réel.
 */
async function authenticateWithApi(
  _email: string,
  _password: string,
  _remember: boolean,
): Promise<AuthResult> {
  const base = process.env.AUTH_API_URL;
  if (!base) {
    return { ok: false, error: "API_UNAVAILABLE" };
  }

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: _email,
        password: _password,
        remember: _remember,
      }),
    });

    if (res.ok) {
      return { ok: true };
    }
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: "INVALID_CREDENTIALS" };
    }
    return { ok: false, error: "API_ERROR" };
  } catch {
    return { ok: false, error: "API_ERROR" };
  }
}

/** Comptes de démo + règles souples en dev (voir commentaire). */
function authenticateWithMock(email: string, password: string): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === "dev@urblink.local" && password === "dev") {
    return { ok: true };
  }

  if (email.includes("@") && password.length >= 4) {
    return { ok: true };
  }

  return { ok: false, error: "INVALID_CREDENTIALS" };
}

export async function loginAction(
  _prev: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  if (!email || !password) {
    return { ok: false, error: "EMPTY_FIELDS" };
  }

  const useMock = process.env.NODE_ENV === "development";

  const result = useMock
    ? authenticateWithMock(email, password)
    : await authenticateWithApi(email, password, remember);

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  // TODO: session / cookies JWT une fois l’API en place
  void remember;

  const locale = await getLocale();
  return redirect({ href: "/", locale });
}
