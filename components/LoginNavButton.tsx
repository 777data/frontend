"use client";

import { Button } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";
import { Link } from "@/i18n/navigation";

type Props = ButtonProps & {
  children: React.ReactNode;
};

export function LoginNavButton({ children, ...props }: Props) {
  return (
    <Button component={Link} href="/login" variant="light" {...props}>
      {children}
    </Button>
  );
}
