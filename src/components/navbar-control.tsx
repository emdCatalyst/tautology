"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useAtom } from "jotai";
import { FaMoon, FaSun } from "react-icons/fa";
import { US, SA } from "country-flag-icons/react/3x2";
import { Button } from "@/components/ui/button";
import { language } from "@/lib/state";
export default function NavbarControl() {
  const { setTheme, theme } = useTheme();
  const [lang, setLanguage] = useAtom(language);
  return (
    <div className="[&>button]:w-fit [&>button]:mx-2 ml-auto">
      <Button
        variant={"outline"}
        onClick={() => setLanguage(lang == "en" ? "ar" : "en")}
      >
        {lang == "en" ? (
          <US className="us w-[100%] h-[100%]" />
        ) : (
          <SA className=" w-[100%] h-[100%]" />
        )}
      </Button>
      <Button
        className={" transition-all "}
        style={{
          transform: theme == "dark" ? "rotate(360deg)" : "rotate(0deg)",
          transition: "transform 0.5s ease",
        }}
        variant={"outline"}
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      >
        {theme == "dark" ? (
          <FaMoon className=" w-[100%] h-[100%]" />
        ) : (
          <FaSun className=" w-[100%] h-[100%]" />
        )}
      </Button>
    </div>
  );
}
