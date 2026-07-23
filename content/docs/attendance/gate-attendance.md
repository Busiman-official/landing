---
title: "Gate Devices & Office Verification"
description: "Two ways Busiman confirms someone is physically at the office, without them doing anything extra."
status: "partial"
platform: "both"
---

Both of these exist to answer the same question — "is this person actually here?" — without turning attendance into a chore. They're optional, and a company can use either, both, or neither.

## The office network check (desktop as a verification point)

Any desktop app on the office Wi-Fi can act as a **proxy** — a small local presence that phones on the same network can reach. This is what [self check-in](/docs/attendance/self-attendance) means by "network-verified": the phone tried to reach a registered office computer on the local network at the moment of check-in, and succeeded.

Set this up from **Settings → Devices → This Computer** on the desktop app (requires the "proxy" permission, granted per-employee by an Admin). Turning it on starts a small local server; anyone on the same office network checking in will verify against it automatically — nobody needs to do anything on the phone side.

**Settings → Devices → Registry** (Admin only) shows every device — proxy computers and gate beacons — registered to your account.

## Gate beacon (automatic check-in)

For offices with a dedicated entrance, Busiman supports a small Bluetooth beacon device (registered the same way, via **Settings → Devices → Registry**) mounted near the door. When an employee's phone comes within range:

1. The app detects the beacon in the background — no need to open Busiman.
2. It checks in (or out) automatically, tagged with that gate's ID.
3. A short voice confirmation plays, so there's feedback without needing to look at the screen.

To avoid duplicate triggers from someone lingering near the door, there's a short cooldown before the same gate can trigger another check-in.

> **Warning:** This needs a development-grade native build of the app — it isn't available through Expo Go, and requires Bluetooth permission granted on the phone. If your team is on a standard app-store build, confirm with your admin whether gate hardware is deployed before relying on it.

## Which one should you use?

- Just want check-in to be effortless when someone's connected to office Wi-Fi? The **network check** alone is enough, and needs no extra hardware.
- Have a single, controlled entrance and want check-in to happen without anyone touching their phone? Add a **gate beacon** there.

Either way, when neither is available, [remote attendance](/docs/attendance/remote-attendance) is always the fallback — nobody gets stuck unable to check in.
