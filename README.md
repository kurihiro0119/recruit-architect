# Recruit Architect - 採用管理システム

採用活動を効率的に管理するためのフルスタックWebアプリケーションです。

## ディレクトリ構造

```
recruit-architect/
├── apps/
│   ├── backend/                 # Hono APIサーバー
│   │   ├── src/
│   │   │   ├── index.ts         # エントリーポイント（CRUDルート定義）
│   │   │   └── adapters/        # データアクセス層
│   │   │       └── d1-db.ts     # Cloudflare D1アダプター
│   │   ├── migrations/          # D1マイグレーション
│   │   │   └── 0001_initial.sql # 初期スキーマ
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── wrangler.toml        # Cloudflare Workers設定
│   │
│   └── frontend/                # React SPAクライアント
│       ├── src/
│       │   ├── main.tsx         # エントリーポイント
│       │   ├── App.tsx          # ルーティング設定
│       │   ├── index.css        # Tailwind CSS
│       │   ├── lib/
│       │   │   └── api.ts       # APIクライアント
│       │   ├── components/      # 共通コンポーネント
│       │   │   ├── Layout.tsx
│       │   │   ├── DataTable.tsx
│       │   │   ├── Modal.tsx
│       │   │   └── FormField.tsx
│       │   └── pages/           # ページコンポーネント
│       │       ├── Dashboard.tsx
│       │       ├── KpiPage.tsx
│       │       ├── InitiativePage.tsx
│       │       ├── CompanyAnalysisPage.tsx
│       │       ├── JobPostingPage.tsx
│       │       ├── JobRolePage.tsx
│       │       ├── CompetitorJobPage.tsx
│       │       ├── OrganizationPage.tsx
│       │       ├── SelectionProcessPage.tsx
│       │       ├── RecruitmentChannelPage.tsx
│       │       └── FaqPage.tsx
│       ├── package.json
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── tsconfig.json
│
├── packages/
│   └── openapi/                 # 共有スキーマ定義
│       ├── src/
│       │   ├── index.ts
│       │   └── schemas/         # Zodスキーマ
│       │       ├── common.ts
│       │       ├── kpi.ts
│       │       ├── initiative.ts
│       │       ├── company-analysis.ts
│       │       ├── job-posting.ts
│       │       ├── job-role.ts
│       │       ├── competitor-job.ts
│       │       ├── organization.ts
│       │       ├── selection-process.ts
│       │       ├── recruitment-channel.ts
│       │       └── faq.ts
│       ├── dist/                # ビルド成果物
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                 # ルートpackage.json
├── pnpm-workspace.yaml          # pnpmワークスペース設定
├── turbo.json                   # Turborepo設定
└── docs/
    ├── requirement/
    │   └── requirement.md       # 要件定義書
    └── architecture/
        └── architecture.md      # アーキテクチャ設計書
```

## 技術選定

### モノレポ管理
- **pnpm workspace**: パッケージ管理とワークスペース機能
- **Turborepo**: ビルドキャッシュとタスク並列実行

### バックエンド
- **Hono**: 軽量で高速なWebフレームワーク（Cloudflare Workers対応）
- **TypeScript**: 型安全な開発
- **Cloudflare D1**: SQLite互換のサーバーレスデータベース

### フロントエンド
- **React 18**: UIライブラリ
- **Vite**: 高速なビルドツール
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **React Router v6**: クライアントサイドルーティング
- **Lucide React**: アイコンライブラリ

### 共有パッケージ
- **Zod**: スキーマ定義とバリデーション（OpenAPI互換）

## 起動方法

### 前提条件
- Node.js 18以上
- pnpm 8以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kurihiro0119/recruit-architect.git
cd recruit-architect

# 依存関係をインストール
pnpm install
```

### 開発サーバーの起動

```bash
# バックエンドとフロントエンドを同時に起動
pnpm run dev
```

または個別に起動:

```bash
# バックエンドのみ起動（ポート8787）
pnpm run dev --filter=@recruit-architect/backend

# フロントエンドのみ起動（ポート5173）
pnpm run dev --filter=@recruit-architect/frontend
```

### アクセスURL
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:8787

### その他のコマンド

```bash
# 型チェック
pnpm run typecheck

# ビルド
pnpm run build
```

## 機能一覧

| 機能 | 説明 | APIエンドポイント |
|------|------|------------------|
| KPI管理 | 採用KPIの目標値・実績値を管理 | `/api/kpis` |
| 採用施策管理 | 採用施策のスケジュール・進捗を管理 | `/api/initiatives` |
| 企業・競合分析 | 企業情報と競合分析を管理 | `/api/company-analyses` |
| 求人票管理 | 求人票の作成・編集・公開を管理 | `/api/job-postings` |
| 業務・役割定義 | 職種・グレード別の業務定義を管理 | `/api/job-roles` |
| 他社求人・ベンチマーク | 競合他社の求人情報を管理 | `/api/competitor-jobs` |
| 組織・体制管理 | 部門・役割・人員構成を管理 | `/api/organizations` |
| 選考プロセス管理 | 選考フローと各ステップを管理 | `/api/selection-processes` |
| 採用チャネル管理 | 採用チャネルの特性・効果を管理 | `/api/recruitment-channels` |
| FAQ管理 | よくある質問と回答を管理 | `/api/faqs` |
| 履歴管理 | 全エンティティの変更履歴を参照 | `/api/history` |
| 管理者機能 | 組織・ユーザー管理 | `/api/admins`, `/api/users` |

## API仕様

各エンティティは以下のCRUD操作をサポートしています:

- `GET /api/{entity}` - 一覧取得
- `GET /api/{entity}/:id` - 個別取得
- `POST /api/{entity}` - 新規作成
- `PUT /api/{entity}/:id` - 更新
- `DELETE /api/{entity}/:id` - 削除

履歴APIは以下のクエリパラメータをサポート:
- `GET /api/history?entityId={id}&entityType={type}` - フィルタリング

## データベース設定（Cloudflare D1）

### ローカル開発

ローカル開発では、wranglerがD1をエミュレートします。特別な設定は不要です。

```bash
# 開発サーバー起動時に自動的にローカルD1が使用されます
pnpm run dev --filter=@recruit-architect/backend
```

### 本番環境へのデプロイ

1. D1データベースを作成:
```bash
cd apps/backend
npx wrangler d1 create recruit-architect-db
```

2. 出力されたdatabase_idを`wrangler.toml`に設定:
```toml
[[d1_databases]]
binding = "DB"
database_name = "recruit-architect-db"
database_id = "your-database-id-here"
```

3. マイグレーションを実行:
```bash
npx wrangler d1 migrations apply recruit-architect-db
```

4. デプロイ:
```bash
npx wrangler deploy
```

## 管理者機能

### 管理者ページ

管理者ページ (`/admin`) では以下の操作が可能です:

- **組織管理**: 組織の作成・編集・削除・停止
- **ユーザー管理**: 組織に紐づくユーザーの作成・編集・削除・パスワード設定

### 管理者の登録

管理者はCLIコマンドでのみ登録可能です:

```bash
# 管理者を作成するSQLを生成
cd apps/backend
pnpm run create-admin <email> <password> <name>

# 例
pnpm run create-admin admin@example.com password123 "Admin User"
```

生成されたSQLを実行:

```bash
# ローカル環境
wrangler d1 execute recruit-architect-db --local --command "INSERT INTO admins ..."

# 本番環境
wrangler d1 execute recruit-architect-db --command "INSERT INTO admins ..."
```

## 注意事項

- **認証なし**: 現在、認証機能は実装されていません。本番環境では適切な認証を追加してください。
- **CORS設定**: 開発用にすべてのオリジンを許可しています。本番環境では適切に制限してください。
- **パスワードハッシュ**: パスワードはSHA-256 + saltでハッシュ化されています。本番環境ではより安全な方法（bcrypt、argon2）の使用を推奨します。

## ライセンス

MIT
