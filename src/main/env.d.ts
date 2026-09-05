/// <reference types="electron-vite/node" />

interface ImportMetaEnv {
  /**
   * 開発時に参照する SQLite ファイルのパス。`.env` で指定する。
   * 未指定なら app.getPath('userData') 配下の DB を使う。
   */
  readonly MAIN_VITE_DB_PATH?: string
}
