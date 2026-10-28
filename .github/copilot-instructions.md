# Copilot への指示

## コードレビュー

- `src/components/ui/` 配下のファイルはレビュー対象外とし、指摘やコメントをしないでください。
  - shadcn CLI で生成したコンポーネントであり、CLI での更新時に差分が出ないよう手を加えない方針のためです。
  - `data-checked:` や `data-horizontal:` などのバリアントは `shadcn/tailwind.css` の `@custom-variant` で定義されているため、記法ミスではありません。
- 指摘点が見つからない（No open issues）場合はPRをApprovedとしてください。
  - 無理やり指摘点を見つけないようにしてください。
