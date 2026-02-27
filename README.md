# 📝 Todo App – Next.js (App Router)

A modern *Todo Application* built using *Next.js (App Router)* with List View and Calendar View support.

This application allows users to *Add, Edit, Delete, and Manage tasks* efficiently.  
Tasks are stored in *LocalStorage*, so data persists even after refreshing the browser.

---

## 🚀 What This Project Is For

This project is a productivity-based Todo Management System that helps users:

- Organize daily tasks
- View tasks in List format
- View tasks in Calendar format
- Edit tasks directly from calendar view
- Persist data using LocalStorage (No backend required)

---

## ✨ Features

### ✅ Task Management
- Add new tasks
- Edit existing tasks
- Delete tasks
- Update task details

### 📋 List View
- Displays all tasks in a structured list
- Easy edit & delete options
- Can mark as **Completed** once the Task is Complete

### 📅 Calendar View
- View tasks by selected date
- Add tasks to specific dates
- Edit tasks directly from calendar
- Visual task tracking by day

### 💾 Local Storage Support
- All tasks are saved in *LocalStorage*
- Data remains after refresh
- No database required

---

## 🛠 Tech Stack

- *Next.js (App Router)*
- *React*
- *TypeScript*
- *React Context API*
- *LocalStorage*
- *react-calendar*
- *xlsx* (for Excel export support)
- *CSS*

---

## 📦 Required Libraries

If you don’t have these installed, run:

```bash
npm install xlsx
```
```bash
npm install react-calendar
```

## ❗ If You Face Any Issues

If you encounter dependency errors or the project is not running properly, follow these steps:

### Step 1: Delete the following folders/files

- .next
- node_modules
- package-lock.json

### Step 2: Reinstall dependencies

```bash
npm install
```

### Step 3: Run the project again

```bash
npm run dev
```
