import { cpSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function copy(name, src, dest) {
  const fullSrc = join(__dirname, "node_modules", src);
  const fullDest = join(__dirname, "public", dest);
  if (!existsSync(fullDest)) mkdirSync(fullDest, { recursive: true });
  try {
    cpSync(fullSrc, fullDest, { recursive: true });
    console.log(`✓ ${name} → /public/${dest}`);
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
  }
}

copy("Scramjet",        "@mercuryworkshop/scramjet/dist",          "scram");
copy("BareMux",         "@mercuryworkshop/bare-mux/dist",          "baremux");
copy("Epoxy Transport", "@mercuryworkshop/epoxy-transport/dist",   "epoxy");
copy("Libcurl Transport","@mercuryworkshop/libcurl-transport/dist","libcurl");

console.log("\n✓ Build complete! Run: node server.js");
