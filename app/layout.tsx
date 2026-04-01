import type { ReactNode } from "react";
import "@mantine/core/styles.css";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
