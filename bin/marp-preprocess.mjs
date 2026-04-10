#!/usr/bin/env node
/**
 * marp-preprocess.mjs
 *
 * Pre-processing pipeline for Marp presentations.
 *
 * Usage:
 *   node marp-preprocess.mjs <absolute-path-to-input.md>
 *
 * Reads the given Markdown file, runs it through all registered preprocessor
 * modules in sequence, writes the result to a temporary file next to the
 * original (so that relative image paths continue to resolve correctly), and
 * prints the temp-file path to stdout.
 *
 * Adding a new preprocessor is as simple as:
 *   1. Create a module under /plugins/marp/<name>/index.js that exports
 *      { preprocess(markdownText, { inputDir }) }.
 *   2. Import it below and add it to the `preprocessors` array.
 *
 * Exit codes:
 *   0  Success – temp file path printed to stdout.
 *   1  Error   – message printed to stderr.
 */

import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { dirname, join, basename, extname } from "node:path";
import { tmpdir } from "node:os";

// Use createRequire so we can load CommonJS plugin modules from absolute paths.
const require = createRequire(import.meta.url);

// ---------------------------------------------------------------------------
// Registered preprocessors (extend this list to add new ones).
// ---------------------------------------------------------------------------
const { preprocess: drawioPreprocess } = require(
  "/plugins/marp/drawio-image/index.js"
);

const preprocessors = [drawioPreprocess];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const inputPath = process.argv[2];

if (!inputPath) {
  process.stderr.write(
    "Usage: node marp-preprocess.mjs <absolute-path-to-input.md>\n"
  );
  process.exit(1);
}

try {
  const inputDir = dirname(inputPath);
  let markdownText = readFileSync(inputPath, "utf8");

  for (const preprocessor of preprocessors) {
    // Each preprocessor may be sync or async; await to support both.
    markdownText = await preprocessor(markdownText, { inputDir });
  }

  // Write the processed content to a temp file inside the same directory as
  // the original so that relative paths (images, etc.) resolve identically.
  const ext = extname(basename(inputPath)) || ".md";
  const tmpDir = mkdtempSync(join(inputDir, ".marp-preprocess-"));
  const tmpFile = join(tmpDir, `preprocessed${ext}`);
  writeFileSync(tmpFile, markdownText, "utf8");

  process.stdout.write(tmpFile + "\n");
  process.exit(0);
} catch (err) {
  process.stderr.write(`[marp-preprocess] error: ${err.message}\n`);
  process.exit(1);
}
