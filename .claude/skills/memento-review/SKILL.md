---
name: memento-review
description: mementolane-app の変更内容をレビューする。現在のdiff・指定ブランチ・PR番号・特定ファイルを対象に、専用のコードレビュー用サブエージェント(code-reviewer)へ分析を委譲し、結果をReportFindingsで報告する。「レビューして」「コードレビューして」「この変更/差分/PRを確認して」「問題ないか見てほしい」といった依頼では、明示的に「レビュー」と言われていなくても必ずこのスキルを使う。
---

## やること

1. レビュー対象を決める。
   - 引数(`$ARGUMENTS`)や会話の文脈から対象を判断する。優先順位は次の通り。
     1. ユーザーが明示した対象(ブランチ名、PR番号、ファイルパスなど)
     2. 現在のワーキングツリーの差分(`git status` で変更・ステージ済みファイルがあればそれ)
     3. 現在のブランチと `main` の差分(mementolane-app のデフォルトブランチは `main`)
   - effort level(`low` / `medium` / `high`)の指定がなければ `medium` とする。

2. `code-reviewer` サブエージェントに Agent ツールで委譲する。
   サブエージェントは新規コンテキストで起動するため、プロンプトには必ず以下を含める。
   - リポジトリのパス(`D:\00_dev\mementolane-app`)
   - レビュー対象の具体的な指定
     (例: `git diff HEAD` を見る / `git diff main...HEAD` を見る / 対象ファイルの一覧 /
     PR番号と `gh pr diff <番号>` を使う指示)
   - effort level
   - 「確認できた指摘のみを、定められたJSON配列形式で返してください」という指示

3. サブエージェントから返ってきたJSON配列を受け取り、そのまま ReportFindings ツールの
   `findings` 引数として渡す(`level` には使用した effort level を指定)。
   JSONのパースに失敗した場合や指摘が0件の場合も、`findings: []` として ReportFindings を呼び出す。

4. ReportFindings の呼び出し後、ユーザー向けに1〜2文で結果の要約を伝える
   (件数や深刻度の傾向など)。指摘の詳細表示は ReportFindings に任せ、
   同じ内容を長文で重複して列挙しない。

## 注意

- このスキル自身はコードを読んでレビュー判断をしない。実際の分析は必ず `code-reviewer`
  サブエージェントに行わせる。
- 修正の適用(`--fix` 相当)やPRへのコメント投稿は行わない。レビュー結果の提示のみ。
