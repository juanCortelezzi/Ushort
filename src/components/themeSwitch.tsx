import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <p>
        The Next-themes library let&apos;s us change the theme without flashing
        on the first load. The current themes is: <code>{theme}</code>
      </p>
      <div className="flex justify-around">
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
    </>
  );
};
