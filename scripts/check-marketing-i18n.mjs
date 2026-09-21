import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const expectedLanguages = ["fr", "en", "es", "ar", "nl", "zh", "pt"];
const errors = [];

function loadTsExport(relativeFile, exportName) {
  const file = path.resolve(relativeFile);
  const source = fs.readFileSync(file, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;

  const module = { exports: {} };
  const sandbox = { module, exports: module.exports, require };
  vm.runInNewContext(compiled, sandbox, { filename: file });
  return module.exports[exportName];
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

function validateBundle(bundle, name) {
  for (const lang of expectedLanguages) {
    if (!bundle?.[lang]) errors.push(`Missing ${name} language: ${lang}`);
  }

  const reference = bundle?.en;
  if (!reference) {
    errors.push(`English ${name} reference missing`);
    return;
  }

  for (const lang of expectedLanguages) {
    validate(reference, bundle[lang], name, lang);
  }
}

validateBundle(loadTsExport("src/lib/i18n/marketing.ts", "MARKETING_COPY"), "marketing");
validateBundle(loadTsExport("src/lib/i18n/auth.ts", "AUTH_COPY"), "auth");

if (errors.length) {
  console.error("\nI18n validation failed:\n");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log(`I18n OK: marketing + auth complete across ${expectedLanguages.length} languages, no placeholders.`);
