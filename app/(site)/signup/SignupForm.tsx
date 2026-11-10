"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import { r } from "@/lib/routes";

/** No backend yet: "Create account" opens an email to the team with the typed details filled in. */
export function SignupForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const body = `Company name: ${company}\nMy name: ${name}\nEmail: ${email}\n\nPlease set up my Busiman account.`;
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Create my Busiman account")}&body=${encodeURIComponent(body)}`;

  return (
    <>
      <h2 className="d3">Your details</h2>
      <label className="field">
        Company name
        <input type="text" name="company" autoComplete="organization" placeholder="Your shop or company" value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label className="field">
        Your name
        <input type="text" name="name" autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="field">
        Email
        <input type="email" name="email" autoComplete="email" placeholder="you@yourcompany.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <a className="btn btn-amber" href={href}>Create account</a>
      <p style={{ fontSize: 14, color: "var(--muted)" }}>This opens an email to the Busiman team with your details filled in.</p>
      <p style={{ fontSize: 15 }}>
        Already have an account?{" "}
        <Link href={r("Login")} style={{ fontWeight: 600, color: "var(--navy)" }}>Log in</Link>
      </p>
    </>
  );
}
