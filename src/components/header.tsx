import Link from "next/link";
import { ThemeSwitch } from "./themeSwitch";

export const Header = () => {
  return (
    <div className="flex justify-between items-center border-b border-b-neutral shadow-md rounded-lg py-4 px-3 my-4">
      <Link href="/">
        <a className="text-4xl text-secondary">Shorter</a>
      </Link>
      <ThemeSwitch />
      <Link href="/create">
        <a className="text-4xl text-secondary">Create</a>
      </Link>
    </div>
  );
};
