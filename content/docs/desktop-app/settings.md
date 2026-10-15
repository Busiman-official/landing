---
title: "Settings on Desktop"
description: "Open Settings from the top bar or the menu at the top right. Settings is divided into sections."
status: "live"
platform: "desktop"
---

Open **Settings** from the top bar or the menu at the top right. Settings is divided into sections.

| Section | Admin | HR | Manager | Employee | Inventory Approver |
|---|---|---|---|---|---|
| Account | Yes | Yes | Yes | Yes | Yes |
| Attendance | Yes | Yes | Yes | Yes | Yes |
| Workforce | Yes | Yes | No | No | No |
| Company | Yes | No | No | No | No |
| Devices | Yes | Yes | Yes | Yes | Yes |
| Logs | Yes | Yes | Yes | Yes | Yes |

## Account

Your personal details, under **Personal Information**.

- You cannot change **Email** or **Department** (the department is managed by HR or Admin).
- You can change Name (required), Phone Number, Employee ID, Designation, Date of Birth, Date of Joining, Address, Bio (up to 500 characters) and Emergency Contact (name, phone, relationship).
- Select **Edit**, make changes, then **Save Changes** (or **Cancel**). You see "Profile updated successfully".

**Warning: your Phone Number is also your sign-in number.** If you change it here, you must use the new number the next time you sign in. Note that the example text in the field shows a US-style number. Enter your usual number.

### Change password

1. In **Settings > Account**, find the **Change Password** card and select **Change Password**.
2. Fill in **Current Password**, **New Password** (at least 6 characters) and **Confirm New Password**. If the two new passwords differ you see "Passwords do not match" and the button stays greyed out.
3. Select **Change Password**. You see "Password changed successfully". Select **Cancel** to close the form without changes.

## Attendance settings

- **Auto Check-In** switch - turn automatic check-in on or off. You see "Auto check-in enabled successfully" or "Auto check-in disabled successfully".
- **Approved networks** (HR and Admin only; others see "Wi-Fi network management is available to HR and Admin roles only.") - the list of Wi-Fi and Ethernet networks that count as being at work.

### Add an approved network

1. Select **Add Network**.
2. Choose **Connection Type**: WiFi or Ethernet. It cannot be changed later.
3. For WiFi, type the **SSID (Network Name)**. **BSSID** is optional.
4. For Ethernet, type the **MAC Address**, and optionally a **Description/Name**.
5. Optionally fill in **Location/Office**.
6. Select **Add Network**.

Busiman does not read your current network for you here. You type the details by hand.

You can edit a network, switch it active or inactive, or delete it. Deleting asks you to confirm and cannot be undone. Select **Show inactive networks** to see switched-off ones.

The Notifications and Attendance Reminders cards on this page are not available yet.

## Workforce (HR and Admin)

### Employees

A roster of staff with their name, email, role, modules, branch, employee ID, phone extension and whether they are Online or Offline. The Online or Offline status is loaded when you open the page and can be out of date until you reopen it.

**Add an employee**

1. Fill in **Name** and **Email** (both required).
2. Choose **Branch** and **Role**, and choose **Modules** (required when the branch has modules).
3. Optionally set Employee ID, Designation and permissions such as Backdate Sales.
4. Enter the **Phone Number**. This is what the person signs in with.
5. Enter a **Password**. It is required.
6. Optionally assign a **Shift**, and enable an app phone extension.
7. Save. You see "Employee created successfully". If an extension was created, its password is shown once. Copy it straight away.

**Open an employee** to see sections: Profile Summary, VoIP, Employment & Role, Shift & Attendance, Task Preferences, Permissions & Overrides and System Audit (created, last updated, last login).

**Change a role, shift or permission**: Busiman shows a confirmation, and sometimes asks for a reason.

**Delete an employee**: Busiman asks "Are you sure you want to delete (name)? This action cannot be undone."

**Admin only:**

- **Set sign-in password** - set a new password for someone (at least 6 characters). They are signed out and must sign in with the new one.
- **Logout** - sign a person out of all their sessions. It appears only for people shown as Online. You confirm with "Logout (name) from all active sessions?".

### Shifts

Create and manage shifts, including Rules, Breaks, Overtime and Assignments.

## Company (Admin only)

- **Company Details** - your company information.
- **Branch Management** - create, edit and delete branches, and choose the modules each branch has (attendance, inventory, sales, purchases, calendar, service, expense). There is no desktop screen for **expense**, so turning it on adds nothing on the computer.
- **Acting as branch** - an Admin can choose "All branches (unfiltered)" or one branch, so that branch-specific actions apply to it.
- **Danger zone: Delete all company data** - see below.

### Delete all company data

This permanently deletes every record in the company. Use it only if you are sure.

1. Read the warning and tick the box confirming you understand it cannot be undone. Select **Continue**.
2. Type the company display name exactly. You can also enter your current password (it is optional, but strongly recommended). Select **Delete everything**.
3. A new administrator email and password are shown **once**. Copy both now, using the Copy buttons. Select **Continue to login**.
4. You are signed out. On the sign-in screen use the new Admin email and password.

## Devices

- **This computer** - settings for using this computer as a "proxy server", which relays requests for devices on the office network that cannot reach Busiman directly. The switches (**Proxy Server Mode** and **Auto-Start Proxy on App Start**) appear only if you have been given proxy permission; Admins always have it. Otherwise you see "You do not have permission to act as a proxy server." and "Contact your administrator to request proxy server permissions.". Turn it on only if your IT or Admin asked you to. If you see "Port 3002 is already in use", another program is using it. The Connected Clients number is not reliable.
- **Registry** (Admin only) - the list of registered devices. You can rotate a device's secret, which means the device must be set up again. The new secret is shown once.

## Logs

This section is meant to show activity logs, but it currently shows nothing ("No logs available"). The **Open Log File** button only shows a message that points to a log file, and that file is not created. Ignore it. Nothing in this section is usable yet.

The tray menu item **View System Logs** only opens the Logs section if Settings is already open. If Settings was closed, you land on Account.
