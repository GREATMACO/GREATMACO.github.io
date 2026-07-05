// Post-build: prepare static export for shared hosting.
//
// IMPORTANT FIX: Next.js 16 + Turbopack puts CSS/JS/fonts in .next/static/
// but does NOT copy them to out/_next/ during output: "export".
// This script copies everything from .next/static → out/_next after all cleanup.

const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "out");
const nextStatic = path.join(root, ".next", "static");

// ─── Step 1: Remove artifact folders that cause directory listings ───

function clean(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    // Keep _next and blog — they get populated in Step 2
    if (entry.name === "_next" || entry.name === "blog") {
      clean(full);
      continue;
    }

    fs.rmSync(full, { recursive: true, force: true });
  }
}

clean(out);

// ─── Step 2: Copy .next/static → out/_next (CSS/JS/fonts) ───
// HTML references /_next/static/chunks/... so we preserve the full directory structure

if (fs.existsSync(nextStatic)) {
  // Create out/_next/static/ first to match Next.js reference paths
  const dest = path.join(out, "_next", "static");
  fs.mkdirSync(dest, { recursive: true });

  function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const fromPath = path.join(src, entry.name);
      const to = path.join(dest, entry.name);
      if (entry.isDirectory()) copyDir(fromPath, to);
      else fs.cpSync(fromPath, to, { force: true });
    }
  }

  // Copy the ENTIRE .next/static/ directory into out/_next/static/
  for (const entry of fs.readdirSync(nextStatic, { withFileTypes: true })) {
    const fromPath = path.join(nextStatic, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(fromPath, to);
    else fs.cpSync(fromPath, to, { force: true });
  }
}

// ─── Step 3: Ensure blog subdirs have index.html (prevent directory listings) ───

const blogDir = path.join(out, "blog");
if (fs.existsSync(blogDir)) {
  const blogIdx = path.join(blogDir, "index.html");
  if (!fs.existsSync(blogIdx)) {
    fs.writeFileSync(blogIdx, "", "utf8");
  }

  const subs = fs.readdirSync(blogDir).filter((e) => {
    const p = path.join(blogDir, e);
    return fs.statSync(p).isDirectory();
  });
  for (const sub of subs) {
    const subIdx = path.join(blogDir, sub, "index.html");
    if (!fs.existsSync(subIdx)) {
      fs.writeFileSync(subIdx, "", "utf8");
    }
  }
}

// ─── Step 4: Place .htaccess in root ───

fs.writeFileSync(path.join(out, ".htaccess"), "DirectoryIndex index.html\n", "utf8");

console.log("Post-build complete.");
