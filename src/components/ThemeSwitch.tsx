"use client";

import { useSyncExternalStore } from "react";

type Theme = "green" | "blue";
const KEY = "wondie-theme";
const THEME_EVENT = "wondie-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);

  return () => {
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "blue"
    ? "blue"
    : "green";
}

function getServerSnapshot(): Theme {
  return "green";
}

export default function ThemeSwitch() {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function pick(t: Theme) {
    if (t === "blue") {
      document.documentElement.dataset.theme = "blue";
    } else {
      delete document.documentElement.dataset.theme;
    }

    try {
      localStorage.setItem(KEY, t);
    } catch {}

    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      <button
        type="button"
        className="sw sw-green"
        aria-label="Green theme"
        aria-pressed={theme === "green"}
        onClick={() => pick("green")}
      />
      <button
        type="button"
        className="sw sw-blue"
        aria-label="Blue theme"
        aria-pressed={theme === "blue"}
        onClick={() => pick("blue")}
      />
    </div>
  );
}
