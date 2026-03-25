import fs from "fs";
process.stdout.write("Hello Dear User! \n");
process.stdout.write(
  "You can`\nAdd \nDelete \nUpdate the task \nList all tasks by status \n\n",
);

let result = [];
if (!fs.existsSync("./tasks.json")) {
  fs.writeFileSync("tasks.json", JSON.stringify([]));
}
result = JSON.parse(fs.readFileSync("./tasks.json", { encoding: "utf-8" }));

const updateStatus = (rest, status) => {
  const taskId = Number(rest[0]);
  if (Number.isNaN(taskId)) {
    console.log("Please enter valid ID");
    return;
  }
  let isExisting = false;
  result = result.map((each) =>
    each.id === taskId
      ? (() => {
          isExisting = true;
          return {
            ...each,
            status: status,
            updatedAt: new Date().toISOString(),
          };
        })()
      : each,
  );
  if (isExisting) {
    fs.writeFileSync("./tasks.json", JSON.stringify(result));
    console.log(`Task status has been updated successfully (ID: ${taskId})\n`);
  } else {
    console.log(`Task with this ID: ${taskId} doesnt exist\n`);
  }
};

process.stdin.on("data", (data) => {
  const input = data.toString().trim();
  if (!input) {
    console.log("Please enter a command");
    return;
  }
  const [command, ...rest] = input.split(/\s+/);
  switch (command) {
    case "add":
      if (rest.length === 0) {
        console.log("Please write description");
        break;
      }
      const nextId = Math.max(...result.map((each) => each.id), 0) + 1;
      const task = {
        id: nextId,
        description: rest.join(" "),
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      result.push(task);
      fs.writeFileSync("./tasks.json", JSON.stringify(result));
      console.log(`Task added successfully (ID: ${nextId})\n`);
      break;

    case "delete":
      const id = Number(rest[0]);
      if (Number.isNaN(id)) {
        console.log("Please enter valid ID");
        break;
      }
      const prevLength = result.length;
      result = result.filter((each) => each.id !== id);
      if (result.length < prevLength) {
        fs.writeFileSync("./tasks.json", JSON.stringify(result));
        console.log(`Task deleted successfully (ID: ${id})\n`);
      } else {
        console.log(`Task with this ID: ${id} doesnt exist\n`);
      }
      break;
    case "update":
      const idForUpdate = Number(rest[0]);
      if (Number.isNaN(idForUpdate)) {
        console.log("Please enter valid ID");
        break;
      }
      if (rest.slice(1).length === 0) {
        console.log("Please write new description");
        break;
      }
      let isExisting = false;
      result = result.map((each) =>
        each.id === idForUpdate
          ? (() => {
              isExisting = true;
              return {
                ...each,
                description: rest.slice(1).join(" "),
                updatedAt: new Date().toISOString(),
              };
            })()
          : each,
      );
      if (isExisting) {
        fs.writeFileSync("./tasks.json", JSON.stringify(result));
        console.log(`Task updated successfully (ID: ${idForUpdate})\n`);
      } else {
        console.log(`Task with this ID: ${idForUpdate} doesnt exist\n`);
      }
      break;
    case "mark-in-progress":
      updateStatus(rest, "in-progress");
      break;
    case "mark-done":
      updateStatus(rest, "done");
      break;
    case "list":
      if (rest[0]) {
        const tasksSpecified = result.filter((elm) => elm.status === rest[0]);
        if (tasksSpecified.length === 0) {
          console.log("No tasks found with this status");
        } else {
          console.log(tasksSpecified);
          console.log(`\n`);
        }
      } else {
        console.log(result);
        console.log(`\n`);
      }
      break;
    default:
      console.log("Command not found");
      break;
  }
});
