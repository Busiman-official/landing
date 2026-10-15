---
title: "Inventory on Desktop"
description: "Open Inventory to manage products, where stock is kept and how it moves. You need the Inventory module on your branch."
status: "live"
platform: "desktop"
---

Open **Inventory** to manage products, where stock is kept and how it moves. You need the Inventory module on your branch.

The Inventory screen has these tabs: **Products**, **Locations**, **Movements**, **Employee Kits**, **Reports** and **Settings**.

## Quick actions at the top

| Button | Shortcut | What it does |
|---|---|---|
| Quick Receipt | Ctrl+R | Opens the Movements area ready to record stock coming in. |
| Quick Transfer | Ctrl+T | Opens the Movements area ready to move stock between places. |
| Search | Ctrl+K | Finds products, locations, serial numbers and pages. |
| Add product | Ctrl+N (on the Products list) | Starts a new product. |

On a Mac, use Ctrl rather than Cmd for Quick Receipt and Quick Transfer. They do not work while Caps Lock is on.

## Products

The Products tab is your product list. From it you can:

- search and open a product to see its details, stock by location, movement history and, for tracked products, serial numbers and batches,
- create a product,
- edit a product,
- import and export products using Excel.

### Add a product

1. Select **Add product**. A two-step guide opens: **Product**, then **Variants & SKU**.
2. On the first step, the only required field is the item name. If it is empty you see "Item name is required".
3. On the second step, add at least one variant with a name. If you do not, you see "Add at least one valid variant to continue." If a variant code is already used, you see "This variant code is already used. Change the variant name or open Details to set a unique code suffix."
4. Save the product.

If you leave the guide before saving, Busiman keeps an unfinished draft on this computer.

## Locations

Locations are the places where stock is kept, arranged as a tree: Warehouse, Zone, Rack and Bin. You can move through the tree with the keyboard. Select **Add Location** to add one, or edit an existing one. Press **/** to jump to the location search.

## Movements

A **movement** is any change to stock. Types include Receipt, Issue, Transfer, Adjustment, Damage, Waste, Loss, Block, Unblock, Count adjustment, Reversal and Stock migration.

A movement has a status: Draft, Pending, Approved, Rejected, Completed or Reversed.

When you create a movement:

- **Ctrl+S** saves it as a draft.
- **Ctrl+Enter** submits it.

Open a movement to see its details and history. A Pending movement shows **Approve** and **Reject** buttons. The buttons appear to everyone, but the server decides who is allowed to use them.

### Receive stock (Quick Receipt) and move stock (Quick Transfer)

Both open the Movements create screen with the movement type already chosen. You then add the products and quantities, save a draft or submit, and, if your company requires it, the movement waits for approval. Follow the on-screen headings and required markers for the details.

## Stock counting

Stock counting checks that the stock in the system matches what is on the shelf. It lives in the Movements area as **Stock Counting**.

The flow is:

1. **Create** a count. Choose a type: Cycle, Full or Spot check. You may freeze stock or use a blind count.
2. **Enter physical stock** for each line and give a reason for any difference.
3. **Submit** the count.
4. An approver chooses **Approve** or **Reject**.

Inventory Approver, Manager and Admin can approve or reject a count. Only an Admin can approve a count they submitted themselves.

## Expiry and disposing of expired stock

The Reports tab has an **Expiry Risk** report that shows batches close to or past their expiry date.

To write off an expired batch:

1. Open the product from **Products** and go to its batches.
2. On the expired batch, select **Dispose**. The button appears only on expired batches.
3. Enter a **Reason for Disposal**. Without a reason you see "Please provide a reason for disposal".
4. Confirm.

## Employee Kits

**Employee Kits** shows the stock and serial numbers held personally by an employee. Select an employee to view their kit. Moving stock back to the warehouse from here is not currently available (see [Known limitations](/docs/desktop-app/known-limitations)).

## Reports

The Reports tab includes: Stock Summary, Location Wise, Expiry Risk, Movement Audit, Damage/Waste, Reconciliation and Variant Stock. In search (Ctrl+K) some of these appear under slightly different names, such as "Batch Expiry Risk".

## Settings (inside Inventory)

- **Serial Templates** - the details recorded for each serial number.
- **Bulk Operations** - change many variants or serial attributes at once.
- **Reason Codes** - the reasons offered for stock changes.

The **Preferences** section is not finished yet.
