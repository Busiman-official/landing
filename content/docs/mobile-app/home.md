---
title: "Home Screen on Mobile"
description: "Home is the first tab. Every main screen shares the same top bar."
status: "live"
platform: "mobile"
---

Home is the first tab. Every main screen shares the same **top bar**.

## The top bar

| Control | What it looks like | What it does |
|---|---|---|
| Logo or branch name | Busiman logo, or a branch name with an arrow (admins with two or more branches) | The branch name opens **Select branch** |
| Bell | A bell, with a red dot when something is new | Opens your alerts (see "Alerts") |
| Blue plus | A round blue **+** | Opens the **Create** sheet. Only shown when your branch has the Service department. Admins always see it |
| Avatar | Your round profile picture | Opens your **Profile** |

## The Create sheet

Tap the blue **+**. The sheet is titled **Create**, with "Choose what you want to add". The rows you see depend on your department and role:

| Row | Description under it | Who sees it |
|---|---|---|
| Create new service report | Log a new servicing job | Everyone with the Create button. HR sees this row, but it opens the Service list instead, because HR cannot create jobs |
| Create new customer | Add a customer record | Everyone with the Create button |
| Add new employee | Bring a team member onto Busiman | Admin |
| New sale | Open the sales counter | Sales department |
| New expense | Log a business expense | Expense department |
| New outsourcing order | Send parts out for work | Service department |
| Add new product | Create a product in your catalog | Inventory department |
| Add new supplier | Add a supplier record | Purchases department |

## Quick Links

Under the top bar you see a grid called **Quick Links**. Each tile opens a section:

| Tile | Opens | Shown when your branch has |
|---|---|---|
| Sales | Sales | Sales |
| Service | Service jobs | Service jobs |
| Expenses | Expenses | Expenses |
| Purchases | Purchases | Purchases |
| Parties | Customers, suppliers, outsourcing partners | Sales, Service jobs or Purchases |
| Inventory | Stock | Inventory |
| Payroll | Payroll | Payroll |

Admins see all of them. If your branch has no matching department, the **Quick Links** heading is hidden. The **Sales** tile shows a pulsing red number when service bills are waiting at the counter.

## Employee dashboard

From top to bottom:

1. **Quick Links**.
2. A red card, **You owe ₹...** ("Advance from the company · tap to view"), if you owe an advance. Tap it to open **My advances**.
3. A status card, once there is something to show:
   - **Checked In**: "Checked in at ..." with a running time such as "2h 15m".
   - **Pending Approval**: "Waiting for manager approval".
   - **Checked Out**.
   - Before you check in today, this card is hidden.
4. A red **Request rejected** box with your manager's reason, if a remote request was turned down.
5. The office-gate message and your main button: **Check In**, **Check Out**, **Cancel Request** (while waiting for approval), or the plain text "You're done for today".
6. The month name (for example "October 2026") with **Present**, **Absent** and **Late** counts.
7. A support footer: "Need a hand? We're here." with an email and phone number to reach the Busiman team.

Pull down to refresh. If loading fails, a red card says "Something went wrong" with **Try Again**.

## Team dashboard (admin, manager, HR, attendance officer)

From top to bottom:

1. A red "Unable to load team data" card with **Try Again**, only if loading failed.
2. **Quick Links**.
3. **Approvals**: attendance requests waiting for you (see "Approvals"). Each card in items 3 and 4 appears only when it has something in it.
4. **Material approvals**, **Material edit requests** and an assignment-requests card, for admins and managers in a branch with Inventory (see "Service jobs").
5. **Your Employees** ("See your team and today's attendance"). Tap the header to open the attendance list. Admins also see a round person-plus button to add an employee. Tap a person to open their attendance page (an admin's row opens **Edit employee** instead). This card appears only when your team has members.
6. **Get your business set up**: a checklist card (see below).
7. The support footer.

Managers and HR in a branch with Attendance also see a small floating **Check In** pill (see "Attendance").

## The "Get your business set up" card

Everyone who sees the team dashboard sees this card until all its rows are done:

| Row | Meaning | Who can finish it |
|---|---|---|
| Add your first employee | Bring your team onto Busiman | Admin only |
| Register a location | Where your stock is kept (Inventory department) | Anyone with Inventory |
| Set up a sales counter | Where you ring up sales (Sales department) | Admin only |
| Set up a service center | Where repair jobs are handled (Service department) | Anyone with Service |

Finished rows turn grey with a tick. When every row is done, the card disappears. If you are not an admin and tap a row that needs an admin, you are quietly sent back to Home (or to Sales for the counter row).
