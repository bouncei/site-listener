"use client"; // this is a client component
import { ReactNode } from "react";
// import { useRouter } from "next/r";
import { useRouter, usePathname } from "next/navigation";

interface LinkProps {
  children: ReactNode;
  href: any;
}
function ActiveLink({ children, href }: LinkProps): JSX.Element {
  const router = useRouter();
  const path = usePathname();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${path === href && " bg-[#1890ff] rounded-lg"} uppercase`}
    >
      {children}
    </a>
  );
}

export default ActiveLink;
