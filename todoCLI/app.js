import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [];

const addTodo = () => {
  rl.question("Enter a todo Content: ", (todo) => {
    if (todo.trim() === "") {
      console.log("Todo cannot be empty.");
      addTodo();
    } else {
      todos.push(todo);
      console.log(`Todo added: ${todo}`);
      showMenu();
    }
  });
};

const viewTodos = () => {
  if (todos.length === 0) {
    console.log("No todos available.");
    showMenu();
  } else {
    console.log("Your Todos:");
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo}`);
    });
    showMenu();
  }
};

const exitApp = () => {
  console.log("Exiting the Todo CLI. Goodbye!");
  rl.close();
};
const showMenu = () => {
  console.log("\nTodo CLI");
  console.log("1. Add Todo");
  console.log("2. View Todos");
  console.log("3. Exit");
  rl.question("Choose an option: ", (option) => {
    switch (option) {
      case "1":
        addTodo();
        break;
      case "2":
        viewTodos();
        break;
      case "3":
        exitApp();
        break;
      default:
        console.log("Invalid option, please try again.");
        showMenu();
    }
  });
};
showMenu();
