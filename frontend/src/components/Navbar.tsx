"use client"

import { Box } from "lucide-react";
import Link from "next/link";

import React, { use } from "react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="bg-white py-3 border-s-slate-200 border-b-2 fixed w-full z-10 top-0">
      <div className="px-4">
        <Link href="/list">
          <Button variant="ghost">
            <Box className="m-1 h-8 w-8" />
            DPDgroup IT Solutions task
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
