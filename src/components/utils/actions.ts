// DB
import prisma from "@/lib/db";

// types
import { MenuItem } from "./types";

export default async function getMenuItems() {
  const menuItems = await prisma.menuItem.findMany({
    include: {
      subItems: true,
    },
  });

  return menuItems as MenuItem[];
}
