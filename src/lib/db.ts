import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";

let dbPromise: Promise<Database> | null = null;

export function getDb() {
  if (!dbPromise) {
    // 開発用・本番用のどちらの DB を使うかは Rust 側（src-tauri/src/lib.rs）で決めている
    dbPromise = invoke<string>("db_url").then((url) => Database.load(url));
  }

  return dbPromise;
}
