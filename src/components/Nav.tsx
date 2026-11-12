"use client";

import { useState } from "react";
import { personal } from "../data/personal";
import ThemeSwitch from "./ThemeSwitch";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav" aria-label="Main">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        {personal.brand}
      </a>
      <ul id="nav-list" className={`nav-list${open ? " open" : ""}`}>
        {personal.nav.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-tools">
        <ThemeSwitch />
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-list"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </nav>
  );
}
