import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import LayoutWrapper from "@/app/components/layout-wrapper";
import Link from "@/app/components/link";
import { createClient } from "@/utils/supabase/server";
import "@yamori-design/styles/dist/global.css";

export const metadata: Metadata = {
  title: "Bingo",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const user = await createClient(({ auth }) => auth.getUser());

  const links = [];

  if (!user.error) {
    links.push(
      <Link key="profile" href="/profile">
        Profile
      </Link>
    );
  } else {
    links.push(
      <Link key="sign-in" href="/sign-in">
        Sign in
      </Link>
    );
  }

  return (
    <html lang="en">
      <body>
        <LayoutWrapper links={links}> {children}</LayoutWrapper>
      </body>
    </html>
  );
}
