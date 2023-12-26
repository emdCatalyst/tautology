"use client";
import React from "react";
import NavbarControl from "@/components/navbar-control";
export default function NavBar({ stick }: { stick: boolean }) {
  return (
    <div
      className={
        "navbar grid grid-cols-[auto,1fr] items-center p-8 w-screen fixed transition ease-in delay-150 " +
        (stick ? "bg-background/70" : "")
      }
    >
      <p className="logo text-2xl">tautology</p>
      <NavbarControl></NavbarControl>
    </div>
  );
}
