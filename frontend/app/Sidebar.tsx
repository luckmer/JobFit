"use client";

import { Sidebar } from "@components/Sidebar";
import { usePathname } from "next/navigation";

export const SidebarRoot = () => {
  const pathname = usePathname();

  return <Sidebar activeRoot={pathname} />;
};
