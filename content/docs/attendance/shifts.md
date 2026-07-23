---
title: "Shifts"
description: "Define working hours, breaks, and overtime rules, then assign them to employees."
status: "live"
platform: "desktop"
---

Shifts are set up on desktop, under **Settings → Workforce → Shifts**, and control what counts as on-time, late, a full day, or overtime for the people assigned to them.

## Creating a shift

Every shift needs a short **code** (e.g. `MORN`, `NIGHT`), a name, and a start/end time. Beyond that, three tabs configure how it actually behaves:

### Check-in / check-out rules

- **Earliest / Latest Allowed Check-In** — the window a check-in is accepted in at all
- **Grace Period** — how many minutes late still counts as on-time
- **Late Check-In Behavior** — what happens beyond the grace period
- **Monthly Late Limit** — how many late arrivals are tolerated before it's flagged
- **Auto Check-Out** — automatically closes out the day at a set time if the employee forgets to check out themselves
- **Minimum Hours for Full Day / Half Day** and **Half-Day Treatment** — how partial attendance gets counted

There are also toggles for edge cases: allowing early check-in, allowing more than one check-in per day, and letting HR/Admin check someone in or out manually when needed.

### Breaks

Each shift can have multiple named breaks (Lunch, Tea Break, etc.), each with its own:

- **Type**, **allowed time window**, and **maximum duration**
- Whether it's **paid** (counts toward working hours) or unpaid, and whether unpaid time auto-deducts
- A **daily limit** if a break type can be taken more than once

> **Tip:** Set a maximum duration and turn on auto-end for breaks you don't want employees to have to remember to close out themselves.

### Overtime

- **Default classification** for hours worked beyond the shift
- **Rounding unit and method** — overtime is rarely counted to the exact minute; this decides how it rounds

## Assigning shifts

Once a shift is defined, assign it to employees from **Shift Assignments** in the same section. An employee follows whatever shift they're assigned to — this is also where the rules above actually take effect for them.

## Next

See how all of this shows up afterward in [History & Reports](/docs/attendance/attendance-history).
