import type { Metadata } from "next";
import { PropsWithChildren, ReactElement } from "react";
import { Link } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { NavigationBarLayout } from "@yamori-design/react-components";
import "@yamori-design/styles/dist/global.css";

export const metadata: Metadata = {
  title: "Bingo",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const { data, error } = await createClient(({ auth }) => auth.getUser());

  const links: ReactElement[] = [
    <Link key="browse" href="/">
      Browse
    </Link>,
    <Link key="new" href="/bingos/new">
      New
    </Link>,
  ];

  if (!error) {
    links.push(
      <Link key="profile" href={`/users/${data.user.id}`}>
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
        <NavigationBarLayout links={links}>
          <main>{children}</main>
        </NavigationBarLayout>
      </body>
    </html>
  );
}
