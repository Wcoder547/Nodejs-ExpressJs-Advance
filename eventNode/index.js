const EventEmiter = require("events");

const emitter = new EventEmiter();
emitter.on("event", (data) => {
  console.log("Event received:", data);
});

emitter.emit("event", "waseem");
