"use client";

import { useState } from "react";
import { contactForm } from "../config/design";
import { personal } from "../data/personal";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") || "")) return; // spam trap
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!contactForm.endpoint) {
      const subject = encodeURIComponent("Portfolio message from " + name);
      const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
      window.location.href = "mailto:" + personal.email + "?subject=" + subject + "&body=" + body;
      return;
    }

    setState("sending");
    try {
      const res = await fetch(contactForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="glass form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" placeholder="Your name" required maxLength={100} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" placeholder="you@example.com" required maxLength={150} autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={6} placeholder="How can I help?" required maxLength={3000} />
      </div>
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-foot">
        <button type="submit" className="btn primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Send message"}
        </button>
        <p className="form-status" role="status">
          {state === "sent" && "Thanks, your message was sent."}
          {state === "error" && "Something went wrong. Please email me directly at " + personal.email + "."}
          {state === "idle" && !contactForm.endpoint && "This opens your email app with the message ready to send."}
        </p>
      </div>
    </form>
  );
}
