import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { env, execPath, exit, platform } from "node:process";

// src-tauri/src/lib.rs の開発ビルド用 DB_URL と合わせる（本番用 DB は削除しない）
const DB_NAME = "mementolane-dev.db";

// Windows の npm.cmd はシェルなしで起動できないため、npm run が設定する
// npm_execpath (npm-cli.js) を node で直接実行してシェルを経由しないようにする
const npm = (...args) =>
  execFileSync(execPath, [env.npm_execpath, ...args], { stdio: "inherit" });

// tauri-plugin-sql は DB を app_config_dir（<設定ディレクトリ>/<identifier>）に作成する
const configDir = () => {
  switch (platform) {
    case "win32":
      return env.APPDATA;
    case "darwin":
      return join(homedir(), "Library", "Application Support");
    default:
      return env.XDG_CONFIG_HOME || join(homedir(), ".config");
  }
};

const main = () => {
  if (!env.npm_execpath) {
    console.error("npm run db:refresh から実行してください。");
    exit(1);
  }

  const { identifier } = JSON.parse(
    readFileSync("src-tauri/tauri.conf.json", "utf8"),
  );
  const dbPath = join(configDir(), identifier, DB_NAME);

  // WAL モードなどで作られる付随ファイルもまとめて削除する
  const targets = ["", "-wal", "-shm", "-journal"]
    .map((suffix) => dbPath + suffix)
    .filter((path) => existsSync(path));

  if (targets.length === 0) {
    console.log(`DB ファイルが見つかりませんでした: ${dbPath}`);
  }
  for (const path of targets) {
    try {
      rmSync(path);
    } catch (err) {
      throw new Error(
        `${path} を削除できませんでした。アプリを終了してから再実行してください。\n${err.message}`,
      );
    }
    console.log(`削除しました: ${path}`);
  }

  // DB はアプリ起動時にマイグレーションで作成されるため、開発モードで起動して生成しなおす
  console.log("\nアプリを起動して DB を生成しなおします...\n");
  npm("run", "tauri", "dev");
};

try {
  main();
} catch (err) {
  console.error(err.message);
  exit(1);
}
