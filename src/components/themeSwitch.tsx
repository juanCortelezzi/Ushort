/* eslint-disable no-unused-vars */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export enum Themes {
  Light = "light",
  Dark = "dark",
  Custom = "mytheme",
}

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex justify-around btn-group">
      <button className="btn btn-primary" onClick={() => setTheme("light")}>
        Light Mode
      </button>
      <button className="btn btn-secondary" onClick={() => setTheme("dark")}>
        Dark Mode
      </button>
      <button className="btn btn-accent" onClick={() => setTheme("mytheme")}>
        Custom Mode
      </button>
    </div>
  );
};
