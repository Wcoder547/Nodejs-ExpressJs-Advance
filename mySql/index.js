import mysql from "mysql2/promise";

const connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "my_database",
});

async function connect() {
  try {
    await connection.connect();
    console.log("Connected to MySQL database successfully.");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
}
connect();

const addUser = async (user) => {
  try {
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    const [result] = await connection.execute(query, [user.name, user.email]);
    console.log("User added successfully:", result);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
const getUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const [rows] = await connection.execute(query);
    console.log("Users retrieved successfully:", rows);
    return rows;
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
};
const updateUser = async (id, user) => {
  try {
    const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    const [result] = await connection.execute(query, [
      user.name,
      user.email,
      id,
    ]);
    console.log("User updated successfully:", result);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
const deleteUser = async (id) => {
  try {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await connection.execute(query, [id]);
    console.log("User deleted successfully:", result);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const showMenu = () => {
  switch (
    prompt(
      "Choose an option:\n1. Add User\n2. Get Users\n3. Update User\n4. Delete User\n5. Exit"
    )
  ) {
    case "1":
      const name = prompt("Enter user name:");
      const email = prompt("Enter user email:");
      addUser({ name, email });
      break;
    case "2":
      getUsers().then((users) => console.log(users));
      break;
    case "3":
      const updateId = prompt("Enter user ID to update:");
      const updateName = prompt("Enter new user name:");
      const updateEmail = prompt("Enter new user email:");
      updateUser(updateId, { name: updateName, email: updateEmail });
      break;
    case "4":
      const deleteId = prompt("Enter user ID to delete:");
      deleteUser(deleteId);
      break;
    case "5":
      console.log("Exiting...");
      process.exit(0);
    default:
      console.log("Invalid option. Please try again.");
      showMenu();
      break;
  }
};

showMenu();
