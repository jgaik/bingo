"use client";

import { signOut } from "../actions";
import { Button } from "@yamori-design/react-components";

export default function SignOutButton() {
  return (
    <Button variant="text" onClick={signOut}>
      Sign out
    </Button>
  );
}
