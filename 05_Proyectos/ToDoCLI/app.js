import { createInterface } from "readline";
import chalk from "chalk";
import { log } from "console";

const tasks = [];
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

showMenu();
promptUser();
