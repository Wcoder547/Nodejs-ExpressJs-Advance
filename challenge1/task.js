const EventEmitter = require("events");
const emitter = new EventEmitter();

const eventsCounts = {
  "user-login": 0,
  "user-purchase": 0,
  "profile-update": 0,
  "user-logout": 0,
};

emitter.on("user-login", (username) => {
  eventsCounts["user-login"]++;
  console.log(`${username} logged in`);
});
emitter.on("user-purchase", (username, item) => {
  eventsCounts["user-purchase"]++;
  console.log(`${username} purchased ${item}`);
});
emitter.on("profile-update", (username, field) => {
  eventsCounts["profile-update"]++;
  console.log(`${username} updated their ${field}`);
});
emitter.on("user-logout", (username) => {
  eventsCounts["user-logout"]++;
  console.log(`${username} logged out!`);
});
emitter.on("summary", () => {
  console.log(eventsCounts);
});

//Emit events
emitter.emit("user-login", "waseem");
emitter.emit("user-purchase", "waseem", "laptop");
emitter.emit("profile-update", "waseem", "email");
emitter.emit("user-logout", "waseem");

emitter.emit("summary");
