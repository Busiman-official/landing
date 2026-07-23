---
title: "Organization Setup"
description: "Set up your company profile, branches, and departments before adding employees."
status: "live"
platform: "desktop"
---

Everything in Busiman sits under one structure: **one company**, **one or more branches**, and **employees** pinned to a branch. This page is the order to set it up in — do it once, correctly, and the rest of the apps just work.

> **Note:** There's no multi-company switching in Busiman — one account is one company. If you run genuinely separate businesses, they need separate Busiman accounts.

## 1. Company profile

**Settings → Company** (Admin only). Set:

- Display name and legal name
- GST number
- Bank accounts and UPI IDs (used on invoices and payment collection)
- Company logo

This is the profile every branch and every generated document — invoices, service reports, payment receipts — pulls from.

## 2. Branches

Still under **Settings → Company**, the **Branches** tab. Each branch has:

- A name, short code, and address
- A **branch manager** — the employee who gets approval authority over that branch
- A set of **enabled departments**, picked from: Attendance, Inventory, Sales, Purchases, Calendar, Service

> **Tip:** Only enable the departments a branch actually uses. A warehouse branch might only need Attendance and Inventory — leaving Sales and Purchases off keeps its team's app simpler.

If your company operates from a single location, you still need at least one branch — everyone is assigned to a branch, even in a one-branch company.

## 3. Employees

**Settings → Workforce → Employees**. Adding an employee here does two things at once: creates their login and assigns them to a branch. Once assigned, they automatically inherit that branch's enabled departments — you don't set permissions per department per person unless you need an override.

From here you also set their **role** (Employee, Manager, HR, Admin), which decides what they can approve and edit. See [Employees & Permissions](/docs/getting-started/first-login) for how roles change what someone sees after logging in.

## What's next

With a company, at least one branch, and employees added, your team can now [install the apps](/docs/getting-started/install-mobile) and log in. From here, [Attendance](/docs/attendance/overview) is the module worth understanding first — it's the one every employee touches every day.
