const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);

app.use(express.static("public"));

server.listen(PORT, () => {
	console.log(`Server läuf auf http://localhost:${PORT}`);
});
