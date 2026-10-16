# Mementolane

## 概要

Mementolane は、タスクを進捗状態ごとのスイムレーンで管理するデスクトップアプリです。
Tauri 2 で構築しており、データはローカルの SQLite に保存されます。

### 主な機能

- タスクの登録（タイトル・状態・開始日・期限）
- 状態ごとのスイムレーン表示
  - 予定 / 今週やること / 作業中 / レビュー中 / 検収中
- カード上での状態変更
- タスクの完了（完了済みのタスクは一覧から非表示になり、状態は変更できません）

## 技術要件

### 動作に必要な環境

- Node.js 22.22.0 以上
- Rust（stable）
- Tauri 2 の前提ソフトウェア（OS ごとに必要なものは [Tauri の Prerequisites](https://v2.tauri.app/start/prerequisites/) を参照）

### 使用技術

| 分類           | 技術                                              |
| -------------- | ------------------------------------------------- |
| デスクトップ   | Tauri 2                                           |
| フロントエンド | React 19 / TypeScript / Vite / React Router       |
| UI             | Tailwind CSS 4 / shadcn（Base UI） / lucide-react |
| フォーム・検証 | react-hook-form / zod                             |
| データベース   | SQLite（`@tauri-apps/plugin-sql`）                |
| フォーマッター | Prettier（`prettier-plugin-tailwindcss`）         |

## セットアップ

```bash
npm install
```

## 開発

開発用ウィンドウを起動します（Vite の開発サーバーも同時に起動します）。

```bash
npm run tauri dev
```

| コマンド               | 内容                                               |
| ---------------------- | -------------------------------------------------- |
| `npm run tauri dev`    | アプリを開発モードで起動                           |
| `npm run tauri build`  | アプリをビルドしてインストーラーを作成             |
| `npm run build`        | フロントエンドの型チェックとビルド                 |
| `npm run format`       | Prettier でコードを整形                            |
| `npm run format:check` | Prettier の整形ルールに沿っているかチェック        |
| `npm run release`      | バージョンを上げてリリース用のコミット・タグを作成 |

## ディレクトリ構成

```
├── src/                     # フロントエンド（React）
│   ├── pages/               # 画面
│   ├── components/
│   │   ├── task/            # タスク関連のコンポーネント
│   │   └── ui/              # shadcn CLI で生成したコンポーネント（手を加えない）
│   ├── repositories/        # DB へのアクセス
│   ├── models/              # zod スキーマと型
│   ├── consts/              # 定数（状態の一覧など）
│   └── lib/                 # DB 接続・日付処理などのユーティリティ
├── src-tauri/               # Tauri（Rust）
│   └── src/lib.rs           # プラグイン設定と DB マイグレーション
└── scripts/release.js       # リリース用スクリプト
```

### データベース

- DB ファイルは `mementolane.db` で、アプリのデータディレクトリに作成されます。
- テーブル定義はマイグレーションとして `src-tauri/src/lib.rs` で管理しています。スキーマを変更するときは、既存のマイグレーションを書き換えず、新しいバージョンを追加してください。

## リリース

```bash
npm run release
```

1. 未コミットの変更がないことを確認します。
2. major / minor / patch から次のバージョンを選択します。
3. `package.json` と `package-lock.json` のバージョンを更新し、`upgrade: vX.Y.Z` のコミットと `vX.Y.Z` タグを作成します。
4. 最後に以下でリモートへ反映します。

```bash
git push --follow-tags
```

## コードレビュー（Claude Code）

Claude Code 用のレビュースキルを `.claude/skills/app-review/` に用意しています。

```
/app-review [PR番号 | ブランチ | パス] [low|medium|high|xhigh|max]
```

- 引数を省略すると、`main` との差分（未コミット分を含む）をレビューします。
- `code-review` スキルによるコードレビューと、このアプリ向けの観点でのパフォーマンスレビューを行い、結果を重大度付きでまとめます。
  - 🔴 改善必須 / 🟡 改善推奨 / 🔵 影響度が低い / 🟢 問題なし（approved）
- `src/components/ui/` 配下は shadcn CLI の生成物のため、レビュー対象外です。
