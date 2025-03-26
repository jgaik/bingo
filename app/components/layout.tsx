"use client";

import {
  NavigationBarLayout,
  NavigationBarLayoutProps,
} from "@yamori-design/react-components";

type LayoutProps = NavigationBarLayoutProps;

export default function Layout(props: LayoutProps) {
  return <NavigationBarLayout {...props} />;
}
