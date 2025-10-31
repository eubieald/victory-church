import Link from "next/link";
// Ui Components
import LocalSwitcher from "./local-switcher";
// i18n
import { useTranslations } from "next-intl";
// Actions
import getMenuItems from "../utils/actions";

export default async function NavBar() {
  const t = useTranslations("MenuTitle");
  const menu = await getMenuItems();

  return (
    <nav className="nav-bar flex justify-between items-center h-20 text-white">
      <Link href="/">Victory Silay</Link>
      <ul className="flex gap-4">
        {menu.map(({ id, title, link, subItems }) => (
          <li key={id} className="group relative cursor-pointer whitespace-nowrap rounded-md px-4 py-2 hover:bg-blue-700 hover:duration-300 hover:ease-in-out">
            {link && <Link href={link}>{t(title)}</Link>}
            {subItems && subItems.length > 0 && (
              <div className="absolute left-1/2 hidden -translate-x-1/2 transform pt-5 group-hover:block">
                <ul className="menu-dropdown w-70 rounded-md border border-gray-200 bg-white py-1 shadow-md">
                  {subItems.map(({ id: submenuId, title: subMenuTitle, link: subMenuLink }) => (
                    <li key={submenuId} className="px-4 py-2 text-gray-800 hover:bg-blue-100">
                      {subMenuLink && <Link href={subMenuLink}>{t(subMenuTitle)}</Link>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <LocalSwitcher />
    </nav>
  );
}