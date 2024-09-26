"use client";
import NavBar from "@/components/navbar";
import { EvaluateForm } from "@/components/evaluate-form";
import { language, truthTable } from "@/lib/state";
import { useAtom } from "jotai";
import i18n from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
export default function Home() {
  console.log(useAtom(language));
  const [lang] = useAtom(language);
  const [table] = useAtom(truthTable);
  const tableRef = useRef<HTMLElement>(null);
  const [navbarStick, setNavbarStick] = useState(false);
  useEffect(() => {
    const options = {
      rootMargin: "-100px 0px 0px 0px",
    };
    const observer = new IntersectionObserver((entries, options) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setNavbarStick(false);
        else setNavbarStick(true);
      });
    }, options);
    observer.observe(document.querySelector(".title")!);
    return () => {
      observer.disconnect();
    };
  });

  return (
    <div className="">
      <NavBar stick={navbarStick}></NavBar>
      <main className=" text-center w-fit flex flex-col items-center m-auto ">
        <p className="title text-6xl mt-32">
          {i18n.t("landing.header", undefined, lang)}
        </p>
        <EvaluateForm tableRef={tableRef}></EvaluateForm>
      </main>
      <section className=" p-20" ref={tableRef}>
        {table.length > 0 ? (
          <Table className="text-center">
            <TableHeader>
              <TableRow className="bg-muted/50">
                {Object.keys(table[0]).map((proposition, i) => {
                  return <TableCell key={i}>{proposition}</TableCell>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.map((row, i) => (
                <TableRow key={i}>
                  {Object.values(row).map((cell, i) => {
                    return <TableCell key={i}>{cell}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          " "
        )}
      </section>
      <footer className="text-center p-2 flex flex-col items-center">
        {i18n.t("footer", { year: new Date(Date.now()).getFullYear() }, lang)}
        <Link href={"https://github.com/emdCatalyst/tautology"}><FaGithub size={20}></FaGithub></Link>
      </footer>
    </div>
  );
}
