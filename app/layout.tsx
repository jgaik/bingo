import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { createClient } from "@/utils/supabase/server";
import {
  LinkProps,
  NavigationBarLayout,
} from "@yamori-design/react-components";
import styles from "./layout.module.scss";
import "@yamori-design/styles/dist/global.css";

export const metadata: Metadata = {
  title: "Bingo",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const { data, error } = await createClient(({ auth }) => auth.getUser());

  const links: Array<LinkProps> = [
    { href: "/", children: "Browse" },
    { href: "/bingos/new", children: "New" },
  ];

  if (!error) {
    links.push({ href: `/users/${data.user.id}`, children: "Profile" });
  } else {
    links.push({ href: "/sign-in", children: "Sign in" });
  }

  return (
    <html lang="en">
      <body>
        <NavigationBarLayout links={links}>
          <main className={styles["app"]}>{children}</main>
        </NavigationBarLayout>
      </body>
    </html>
  );
}
