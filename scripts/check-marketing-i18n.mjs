import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);

const file = path.resolve("src/lib/i18n/marketing.ts");
const source = fs.readFileSync(file, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
}).outputText;

const module = { exports: {} };
const sandbox = {
  module,
  exports: module.exports,
  require,
};
vm.runInNewContext(compiled, sandbox, { filename: file });

const copy = module.exports.MARKETING_COPY;
const expectedLanguages = ["fr", "en", "es", "ar", "nl", "zh", "pt"];
const errors = [];

for (const lang of expectedLanguages) {
  if (!copy?.[lang]) errors.push(`Missing marketing language: ${lang}`);
}

function validate(reference, candidate, currentPath, lang) {
  if (typeof reference === "string") {
    if (typeof candidate !== "string" || candidate.trim().length === 0) {
      errors.push(`${lang}: missing string at ${currentPath}`);
      return;
    }

    const normalized = candidate.trim();
    if (["...", "…", "TBD", "TODO", "Q", "A"].includes(normalized)) {
      errors.push(`${lang}: placeholder value at ${currentPath}: ${normalized}`);
    }
    return;
  }

  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      errors.push(`${lang}: expected array at ${currentPath}`);
      return;
    }
    if (candidate.length !== reference.length) {
      errors.push(`${lang}: array length mismatch at ${currentPath} (${candidate.length} vs ${reference.length})`);
      return;
    }
    reference.forEach((item, index) => validate(item, candidate[index], `${currentPath}[${index}]`, lang));
    return;
  }

  if (reference && typeof reference === "object") {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
      errors.push(`${lang}: expected object at ${currentPath}`);
      return;
    }

    for (const key of Object.keys(reference)) {
      if (!(key in candidate)) {
        errors.push(`${lang}: missing key ${currentPath}.${key}`);
        continue;
      }
      validate(reference[key], candidate[key], `${currentPath}.${key}`, lang);
    }

    for (const key of Object.keys(candidate)) {
      if (!(key in reference)) errors.push(`${lang}: unexpected key ${currentPath}.${key}`);
    }
  }
}

const reference = copy?.en;
if (!reference) errors.push("English marketing reference missing");
else {
  for (const lang of expectedLanguages) validate(reference, copy[lang], "marketing", lang);
}

if (errors.length) {
  console.error("\nMarketing i18n validation failed:\n");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log(`Marketing i18n OK: ${expectedLanguages.length} languages, complete structure, no placeholders.`);
