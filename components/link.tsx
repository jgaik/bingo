import { Link as YamoriLink } from "@yamori-design/react-components";
import NextLink from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

export const Link: React.FC<LinkProps> = ({ children, ...props }) => (
  <NextLink passHref legacyBehavior {...props}>
    <YamoriLink>{children}</YamoriLink>
  </NextLink>
);
