"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTooth } from "react-icons/fa";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Patients", href: "/patients/list" },
  ];

  return (
    <nav>
      <ul className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
        <Link href="/">
          <FaTooth />
        </Link>
        {links.map((link) => (
          <li
            key={link.label}
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
