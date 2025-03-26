"use client";

import { Link as YamoriLink } from "@yamori-design/react-components";
import NextLink from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ children, ...props }: LinkProps) {
  return (
    <NextLink passHref legacyBehavior {...props}>
      <YamoriLink>{children}</YamoriLink>
    </NextLink>
  );
}
