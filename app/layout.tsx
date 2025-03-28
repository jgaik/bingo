import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import Layout from "@/app/components/layout";
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
        <Layout links={links}> {children}</Layout>
      </body>
    </html>
  );
}
