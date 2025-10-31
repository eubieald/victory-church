"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
// i18n
import { useLocale } from "next-intl";
// Assets
import languageIcon from "@public/icons/language-solid.svg";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const localActive = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    startTransition(() => {
      router.replace(`/${selectedLocale}${pathname ? `/${pathname}` : ''}`);
    });
  };

  return (
    <div className="text-white">
      <div className="relative w-[30px]">
        <Image
          src={languageIcon}
          alt="language icon"
          priority={true}
          placeholder='empty'
        />
      </div>
      <label htmlFor="language" />
      <select id="language" className="bg-black text-white py-2"
        onChange={onSelectChange}
        defaultValue={localActive}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="jp">日本語</option>
      </select>
    </div>
  );
}
