#[cfg(debug_assertions)]
use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};

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
            description: "effortsテーブル作成",
            sql: "CREATE TABLE efforts(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                slot INTEGER NOT NULL,
                task_id INTEGER NOT NULL
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "工数サンプルデータの追加",
            sql: "INSERT INTO efforts (date, slot, task_id) VALUES
            ('2026-10-20', 12, 1),
            ('2026-10-20', 14, 1),
            ('2026-11-30', 14, 1);",
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
                .add_migrations("sqlite:mementolane.db", migrations())
                .build(),
        )
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
