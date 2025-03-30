"use client";

import {
  NavigationBarLayout,
  NavigationBarLayoutProps,
} from "@yamori-design/react-components";

type LayoutWrapperProps = NavigationBarLayoutProps;

export default function LayoutWrapper(props: LayoutWrapperProps) {
  return <NavigationBarLayout {...props} />;
}
