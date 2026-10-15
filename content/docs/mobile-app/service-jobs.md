---
title: "Service Jobs and Reports on Mobile"
description: "Open Service from Quick Links. You need the Service department. A service job (also called a service report) tracks a repair or visit from request to payment."
status: "live"
platform: "mobile"
---

Open **Service** from Quick Links. You need the Service department. A **service job** (also called a service report) tracks a repair or visit from request to payment.

## The job list

Search with "Search jobs, customer, phone…". Use the filters, and the truck button to see only outsourcing orders. By default the list hides jobs that are Completed, Cancelled or Sent to Counter. Admins and managers also see **Set BOM** and **Service centers** links. **Set BOM** opens each machine's standard parts list (bill of materials).

If the list is empty it says "No jobs here yet". A message "You are not assigned to a service center yet. Ask your admin to add you to a center." means you need an admin to add you.

## Creating a job

Use the blue **+** > **Create new service report**, or the **+** in the Service list. Admins, managers and employees can create jobs. HR cannot. The screen is titled **New Service Job**.

1. Choose the type: **On-site** or **In-office**.
2. Choose the **Customer**. This is required.
3. For on-site jobs, add the **Service address**. It is filled in from the customer. A microphone button lets you speak it.
4. Add **Machines**. These are required for in-office jobs. Tap **Add machine**, pick it, add its serial number and describe the **Problem**. Tap **Save**, or **Add another machine**.
5. Admins and managers pick **Assign technicians**. If an employee creates a job, they are assigned automatically.
6. On-site jobs also offer **Request parts**.
7. Tap **Create**. The new job's **Job details** page opens.

If an open job already exists for the same serial number, Busiman asks if you want to create another anyway.

## Working a job

On **Job details**, the buttons at the bottom belong to the **technician assigned to that job**. Admins and managers see an **Assign technician** panel instead. Other staff see **Request to be assigned this job**. Your manager is notified.

A typical flow for the assigned technician:

1. **Start Service** (or **Start** and **Start All** when there are several machines). The job becomes **In Progress**.
2. When the work is done, choose **Cancel**, **Pending** (on-site jobs only) or **Approve**. The Approve button may read **Continue** or **Create bill** depending on the job.
3. **Approve** opens the parts approval screen. A manager's approval of parts may be needed first. A banner tells you.
4. Choose **Collect payment**, then **Continue to signature** if needed.
5. For jobs with one machine, **Complete** appears after approval. For several machines you use **Approve** and **Next machine**, then **Clear** and **Approve parts** on the last one.
6. The customer signs on **Customer Signature**. Tap **Submit report**. If the customer has not signed, a message asks you to get their signature.

Job statuses you may see: **Unassigned**, **Assigned**, **Scheduled**, **Kit Ready**, **In Progress**, **Pending**, **Completed**, **Sent to Counter**, **Closed** and **Cancelled**.

## Collecting payment

The payment screen lists the parts (each tagged as fitted to a machine or sold separately), and has fields for **Service charge**, **Discount** and **Pending / udhar**. You can also use **Use balance** for store credit. Choose **Cash**, **UPI** or **Bank**. Bank and UPI let you pick a company account, and add a reference. UPI also has a **Generate** button for a QR code.

The amounts must add up. Busiman says "Pending + received must equal ₹..." if not. Partial payment works. Whatever the customer does not pay now goes in **Pending / udhar**.

- **Send to counter** hands the bill to the cashier. It is not available when you enter a discount, or for parts sold straight from your kit.
- **Continue** goes on to the signature.

## Editing after completion

After a job is **Completed**, the assigned technician, managers and admins see a red bar, "Edit window closes in ...". Tap it to open **Edit Service Report** with four options: **Problem & Notes**, **Materials Used**, **Materials Removed** and **Bill & Payment**. Bill changes need admin approval. The rest saves right away. When the window ends, changes need admin approval.

## Material approvals

Admins and managers in a branch with Inventory see these cards on the team Home:

- **Material approvals**: a technician asks to pick up, return or remove parts. Tap a row to see the parts. Use the round tick to approve and the round cross to reject. A reject sheet asks for a reason.
- **Material edit requests**: corrections made after a job is completed. The tick and cross work for managers. **But if a manager taps the card itself, Busiman sends them back to Home**, because the detail screen is for admins only.
- An **assignment requests** card shows colleagues asking to be assigned a job.

## My Kit

**Kit** is the parts you carry as a technician. Open the **Kit** tab to see **My Kit**. Your branch needs the Service department.

- Search with "Search item, serial, customer, job…".
- The filter button (an icon to the right of the search box) lets you choose the type (all, bulk stock or serial units), whether items are linked to a job, when they were issued, and the sort order.
- Cards show bulk stock (quantity) and serial items (individual units).
- An empty kit says "Your kit is empty".
- The blue **+** requests more parts from inventory. Pick a warehouse, search for parts, set quantities or serials, and tap the request button. Your request appears under **Waiting for approval**. A trash button withdraws a request after you confirm.
- Inside a job, **Add from kit** adds parts you already carry.
- Admins and managers can tap the "items · kit name" line to open **Switch kit** and look at another person's kit. Employees cannot.

## Outsourcing

Outsourcing means sending parts or machines to an outside vendor. Start with the blue **+** > **New outsourcing order**, or open the outsourcing view in the Service list. In short: choose where the items are going and where they come from, add the items, then save. Some orders need a manager's approval first, unless the person has the **Skip outsourcing approval** switch.

On the **Outsourcing order** page:

- Approvers use **Approve & send** or **Reject**.
- **Record return** logs the parts coming back.
- **Create Bill** records the vendor's bill.
- **Write off** is for parts that will not come back.
- A report can be downloaded as PDF or Excel and shared from your phone.

Admins and managers see how each vendor is doing under **Parties** > **Outsourcing**. Tap a vendor to open **Vendor detail** with **Total orders**, **Closed**, **Avg turnaround** and **Overdue rate**.

> Outsourcing forms may look slightly different from this short description. The steps are the same.

## Service centers

A **service center** is where your repair jobs are handled. Admins and managers reach **Service centers** from the Service list. The setup card on Home also leads there (**Set up a service center**).

## Sharing a job

From a job you can download the invoice as a PDF and share it, including by WhatsApp when the customer has a phone number on file. If there is no number, a message asks you to add one.
