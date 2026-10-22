#[cfg(debug_assertions)]
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};

// 開発ビルドと本番ビルドで DB ファイルを分ける
#[cfg(debug_assertions)]
const DB_URL: &str = "sqlite:mementolane-dev.db";
#[cfg(not(debug_assertions))]
const DB_URL: &str = "sqlite:mementolane.db";

// フロントエンドが接続する DB をビルド種別に合わせるため、URL を返す
#[tauri::command]
fn db_url() -> &'static str {
    DB_URL
}

fn migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "tasksテーブル作成",
            sql: "CREATE TABLE tasks(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'planning',
                start_at TEXT,
                due_at TEXT,
                completed INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
        );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "サンプルデータの追加",
            sql: "INSERT INTO tasks (title, status, start_at, due_at) VALUES
        ('Tauriの環境構築', 'planning', '2026/01/01', '2026/10/01'),
        ('Tailwindの導入', 'wip', '2026/10/11', '2026/10/30');
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "実績時間テーブルの追加",
            sql: "CREATE TABLE actuals(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                slot INTEGER NOT NULL,
                task_id INTEGER NOT NULL
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "実績時間テーブルの追加",
            sql: "INSERT INTO actuals (date, slot, task_id) VALUES
            ('2026-10-21', 1, 1),
            ('2026-10-28', 2, 1),
            ('2026-11-30', 5, 2);",
            kind: MigrationKind::Up,
        }
    ]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(DB_URL, migrations())
                .build(),
        )
        .invoke_handler(tauri::generate_handler![db_url])
        .setup(|app| {
            // 開発ビルドのときだけ、起動時にdevtoolsを開く
            #[cfg(debug_assertions)]
            if let Some(window) = app.get_webview_window("main") {
                window.open_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
