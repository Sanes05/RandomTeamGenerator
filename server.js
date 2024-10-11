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
		db.run(`CREATE TABLE IF NOT EXISTS rooms (
    room_id TEXT PRIMARY KEY,
    user_name TEXT
    )`);
	}
});

app.use(express.static("public"));

app.get("/create-room", (req, res) => {
	const roomId = uuidv4();
	const username = req.query.username || "Anonymer Nutzer";

	const sql = `INSERT INTO rooms (room_id, user_name) VALUES (?, ?)`;
	db.run(sql, [roomId, username], (err) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({error: "Fehler beim Erstellen des Raums"});
		} else {
			res.json({roomId});
		}
	});
});

io.on("connection", (socket) => {
	console.log("Ein Benutzer hat sich verbunden.");

	socket.on("join-room", (roomId, username) => {
		const sql = `SELECT room_id FROM rooms WHERE room_id = ?`;
		db.get(sql, [roomId], (err, row) => {
			if (err) {
				console.error(err.message);
				socket.emit("error", "Fehler beim Beitritt zum Raum.");
			} else if (row) {
				socket.join(roomId);
				const insertSql = `INSERT INTO rooms (room_id, user_name) VALUES (?, ?)`;
				db.run(insertSql, [roomId, username], (err) => {
					if (err) {
						console.error(err.message);
					} else {
						io.to(roomId).emit("user-joined", username);
						console.log(`${username} ist Raum ${roomId} beigetreten.`);
					}
				});
			} else {
				socket.emit("error", "Raum nicht gefunden.");
			}
		});
	});

	socket.on("leave-room", (roomId, username) => {
		socket.leave(roomId);
		const sql = `DELETE FROM rooms WHERE room_id = ? AND user_name = ?`;
		db.run(sql, [roomId, username], (err) => {
			if (err) {
				console.error(err.message);
			} else {
				io.to(roomId).emit("user-left", username);
				console.log(`${username} hat Raum ${roomId} verlassen.`);
			}
		});
	});

	socket.on("disconnect", () => {
		console.log("Ein Benutzer hat die Verbindung getrennt.");
	});
});

server.listen(PORT, () => {
	console.log(`Server läuf auf http://localhost:${PORT}`);
});
