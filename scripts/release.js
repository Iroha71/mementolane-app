import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout, env, execPath, exit } from "node:process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

// Windows の npm.cmd はシェルなしで起動できないため、npm run が設定する
// npm_execpath (npm-cli.js) を node で直接実行してシェルを経由しないようにする
const npm = (...args) =>
  execFileSync(execPath, [env.npm_execpath, ...args], { stdio: "inherit" });

const bump = (version, type) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) throw new Error(`不正なバージョン形式です: ${version}`);
  const [major, minor, patch] = match.slice(1).map(Number);
  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`不明なバージョン種別です: ${type}`);
  }
};

const main = async () => {
  if (!env.npm_execpath) {
    console.error("npm run release から実行してください。");
    exit(1);
  }

  if (git("status", "--porcelain")) {
    console.error(
      "未コミットの変更があります。コミットまたは退避してから実行してください。",
    );
    exit(1);
  }

  const { version: current } = JSON.parse(readFileSync("package.json", "utf8"));
  const candidates = ["major", "minor", "patch"].map((type) => ({
    type,
    version: bump(current, type),
  }));

  console.log(`現在のバージョン: v${current}\n`);
  candidates.forEach(({ type, version }, i) =>
    console.log(`  ${i + 1}) ${type.padEnd(5)}  v${version}`),
  );

  const rl = createInterface({ input: stdin, output: stdout });
  const answer = await rl.question(
    "\nリリースするバージョンを選択してください [1-3]: ",
  );
  const selected = candidates[Number(answer.trim()) - 1];
  if (!selected) {
    rl.close();
    console.error("無効な選択です。中止しました。");
    exit(1);
  }

  const next = selected.version;
  const tag = `v${next}`;
  if (git("tag", "--list", tag)) {
    rl.close();
    console.error(`タグ ${tag} は既に存在します。中止しました。`);
    exit(1);
  }

  const confirm = await rl.question(
    `v${current} → ${tag} でリリースしますか？ [y/N]: `,
  );
  rl.close();
  if (confirm.trim().toLowerCase() !== "y") {
    console.log("中止しました。");
    exit(0);
  }

  // package.json / package-lock.json の更新、コミット、タグ作成を npm version に任せる
  npm("version", next, "--tag-version-prefix=v", "-m", `upgrade: ${tag}`);

  console.log(`\n${tag} のコミットとタグを作成しました。`);
  console.log(`リモートへ反映するには: git push --follow-tags`);
};

main().catch((err) => {
  console.error(err.message);
  exit(1);
});
