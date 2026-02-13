import express from "express";
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8080;

// Serve static files from public/
app.use(express.static(join(__dirname, "public")));

// Catch-all → index.html
app.use((req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// Wisp WebSocket handler
server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`Zyron 2.0 running on http://localhost:${PORT}`);
});
