# Task Tracker CLI

A command-line application for managing tasks directly from the terminal.
Supports creating, updating, deleting, and tracking task status with persistent local storage.

---

## Features

- Create new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as in-progress or done
- List all tasks or filter by status

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Arshakyan11/Task-Tracker.git
```

Navigate to the project folder:

```bash
cd Task-Tracker
```

Install dependencies:

```bash
npm install
```

---

## Usage

Start the application:

```bash
npm start
```

Then enter commands directly in the terminal.

---

## Commands

Add a task:

```bash
add Buy groceries
```

Update a task:

```bash
update 1 Buy groceries and cook dinner
```

Delete a task:

```bash
delete 1
```

Mark as in progress:

```bash
mark-in-progress 1
```

Mark as done:

```bash
mark-done 1
```

List all tasks:

```bash
list
```

List tasks by status:

```bash
list todo
list in-progress
list done
```

---

## Data Storage

Tasks are stored in a local JSON file:

```bash
tasks.json
```

Each task contains:

- `id` — unique identifier
- `description` — task description
- `status` — todo / in-progress / done
- `createdAt` — creation timestamp
- `updatedAt` — last update timestamp

---

## Sample Data

A sample file is included for testing:

```bash
tasks.sample.json
```

If you want to try the application with pre-filled data, simply rename:

- `tasks.sample.json` → `tasks.json`

` `
This allows you to start with pre-filled data without creating tasks manually.

---

## Notes

- Commands are case-sensitive
- Task IDs must be valid numbers
- Data persists between runs using `tasks.json`

---

## Tech Stack

- Node.js
- Built-in `fs` module

---
