import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const ENV_FILE_MAP = {
  dev: ".env.dev",
  staging: ".env.staging",
  prod: ".env.prod",
};

function parseEnvFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const out = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalsIdx = line.indexOf("=");
    if (equalsIdx <= 0) continue;

    const key = line.slice(0, equalsIdx).trim();
    let value = line.slice(equalsIdx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    out[key] = value;
  }

  return out;
}

const [, , appEnv, nextCommand, ...nextArgs] = process.argv;

if (!appEnv || !nextCommand) {
  console.error(
    "Usage: node scripts/run-env.mjs <dev|staging|prod> <next-command> [args...]"
  );
  process.exit(1);
}

if (!(appEnv in ENV_FILE_MAP)) {
  console.error(`Invalid environment: ${appEnv}. Use one of: dev, staging, prod.`);
  process.exit(1);
}

const envFilePath = resolve(process.cwd(), ENV_FILE_MAP[appEnv]);
if (existsSync(envFilePath)) {
  const envVars = parseEnvFile(envFilePath);
  for (const [key, value] of Object.entries(envVars)) {
    process.env[key] = value;
  }
}

process.env.APP_ENV = appEnv;
if (appEnv === "dev") {
  process.env.NODE_ENV = "development";
} else {
  process.env.NODE_ENV = "production";
}

const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";
const child = spawn(npxBin, ["next", nextCommand, ...nextArgs], {
  stdio: "inherit",
  env: process.env,
  shell: false,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
