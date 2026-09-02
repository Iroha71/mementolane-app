CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(30) NOT NULL,
	`status` text(10) DEFAULT 'plan',
	`start_at` text,
	`due_at` text,
	`detail` text(200)
);
