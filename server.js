const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const socketIO = require("socket.io");
const {v4: uuidv4} = require("uuid");
const sqlite3 = require("sqlite3").verbose();

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const db = new sqlite3.Database("./rooms.db", (err) => {
	if (err) {
		console.error(err.message);
	} else {
		console.log("Verbunden mit der SQLite-Datenbank.");

		// Erstelle die Tabelle für die Räume, wenn sie noch nicht existiert
		db.run(`CREATE TABLE IF NOT EXISTS rooms (
    room_id TEXT PRIMARY KEY,
    user_name TEXT
    )`);
	}
});

app.use(express.static("public"));

server.listen(PORT, () => {
	console.log(`Server läuf auf http://localhost:${PORT}`);
});
