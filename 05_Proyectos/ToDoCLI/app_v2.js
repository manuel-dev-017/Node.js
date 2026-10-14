import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];
const DB_FILE = "tasks.txt";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* function loadTasks() {
  try {
    const data = readFileSync(DB_FILE, "utf8");
    if (data) {
      tasks.push(...JSON.parse(data));
    }
  } catch (error) {
    console.error(
      chalk.green.bold(
        "\nNo se encontraron tareas guardadas. Se creará un nuevo archivo de tareas.\n",
      ),
    );
  }
} */

function loadTasks() {
  try {
    const data = readFileSync(DB_FILE, "utf-8");
    const lines = data.split("\n");
    tasks.length = 0;

    lines.forEach((line) => {
      if (line.trim() !== "") {
        const [description, completed] = line.split("|");
        tasks.push({ description, completed: completed === "true" });
      }
    });

    console.log(chalk.green.bold("Las tareas se han cargado desde la BD\n"));
  } catch (err) {
    console.log(chalk.green.bold("No hay tareas por hacer 😀👌🏻\n"));
  }
}

/* function saveTasks() {
  try {
    writeFileSync(DB_FILE, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error al guardar las tareas:", error);
  }
} */

function saveTasks() {
  const data = tasks
    .map((task) => `${task.description}|${task.completed}`)
    .join("\n");
  writeFileSync(DB_FILE, data, "utf-8");
  console.log(chalk.green.bold("Tareas guardadas en la BD con éxito\n"));
}

function showMenu() {
  console.log(chalk.yellow.bold("++++++ To Do App ++++++"));
  console.log(chalk.blue("1. Agregar Tarea"));
  console.log(chalk.yellowBright("2. Listar Tareas"));
  console.log(chalk.green("3. Marcar Tarea como Completada"));
  console.log(chalk.red("4. Salir"));
  console.log(chalk.yellow("\n-------------------------\n"));
}

function addTask() {
  rl.question(
    chalk.cyan("Ingresa la descripción de la tarea: "),
    (description) => {
      tasks.push({ description, completed: false });
      saveTasks();
      console.log(chalk.green("Tarea agregada exitosamente!"));
      console.log(chalk.yellow("-------------------------\n"));
      // showMenu();
      promptUser();
    },
  );
}

function listTasks() {
  if (tasks.length === 0) {
    console.log(chalk.yellow("No hay tareas disponibles."));
  } else {
    console.log(chalk.yellow("Tareas actuales:"));
    tasks.forEach((task, index) => {
      console.log(
        `${index + 1}. ${task.description} - ${task.completed ? chalk.green("Completada") : chalk.red("Pendiente")}`,
      );
    });
  }
  console.log(chalk.yellow("-------------------------\n"));
  // showMenu();
  promptUser();
}

function markTaskCompleted() {
  rl.question(
    chalk.cyan("Ingresa el número de la tarea a marcar como completada: "),
    (taskNumber) => {
      const index = parseInt(taskNumber) - 1;
      if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        saveTasks();
        console.log(
          chalk.green(
            `Tarea "${tasks[index].description}" marcada como completada!`,
          ),
        );
      } else {
        console.log(chalk.red("Número de tarea inválido."));
      }
      console.log(chalk.yellow("-------------------------\n"));
      // showMenu();
      promptUser();
    },
  );
}

function promptUser() {
  rl.question(chalk.cyan("Elige una opción, digita el número: "), (option) => {
    switch (option) {
      case "1":
        addTask();
        break;
      case "2":
        listTasks();
        break;
      case "3":
        markTaskCompleted();
        break;
      case "4":
        console.log("Saliendo de la aplicación...\n");
        rl.close();
        break;
      default:
        console.log(chalk.red.bold("Opción inválida"));
        showMenu();
        promptUser();
        break;
    }
  });
}

loadTasks();
showMenu();
promptUser();
