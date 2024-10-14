const express = require("express");
const req = require("express/lib/request");
const http = require("http");
const socketIO = require("socket.io");
const {v4: uuidv4} = require("uuid");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// SQLite-Datenbank einrichten
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

app.use(express.static("Public"));

// Route zur Erstellung eines Raums
app.get("/create-room", (req, res) => {
	const roomId = uuidv4(); // Generiere eine eindeutige Raum-ID
	res.json({roomId}); // Sende die Raum-ID zurück
});

// Route für einen Raum-Link (wird zum Anzeigen des Raumes im Frontend verwendet)
app.get("/room/:roomId", (req, res) => {
	const roomId = req.params.roomId;
	res.sendFile(__dirname + "/public/room.html"); // Raum-Seite anzeigen
});

// Socket.IO für Echtzeitkommunikation
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

				// Dem Raum den Benutzer hinzufügen
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

		// Benutzer aus der SQLite-Datenbank entfernen
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
