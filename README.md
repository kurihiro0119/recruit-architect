# Recruit Architect - 採用管理システム

採用活動を効率的に管理するためのフルスタック Web アプリケーションです。

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

- **Hono**: 軽量で高速な Web フレームワーク（Cloudflare Workers 対応）
- **TypeScript**: 型安全な開発
- **Cloudflare D1**: SQLite 互換のサーバーレスデータベース

### フロントエンド

- **React 18**: UI ライブラリ
- **Vite**: 高速なビルドツール
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファースト CSS フレームワーク
- **React Router v6**: クライアントサイドルーティング
- **Lucide React**: アイコンライブラリ

### 共有パッケージ

- **Zod**: スキーマ定義とバリデーション（OpenAPI 互換）

## 起動方法

### 前提条件

- Node.js 18 以上
- pnpm 8 以上

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

### アクセス URL

- フロントエンド: http://localhost:5173
- バックエンド API: http://localhost:8787

### その他のコマンド

```bash
# 型チェック
pnpm run typecheck

# ビルド
pnpm run build
```

## 機能一覧

| 機能                   | 説明                               | API エンドポイント          |
| ---------------------- | ---------------------------------- | --------------------------- |
| KPI 管理               | 採用 KPI の目標値・実績値を管理    | `/api/kpis`                 |
| 採用施策管理           | 採用施策のスケジュール・進捗を管理 | `/api/initiatives`          |
| 企業・競合分析         | 企業情報と競合分析を管理           | `/api/company-analyses`     |
| 求人票管理             | 求人票の作成・編集・公開を管理     | `/api/job-postings`         |
| 業務・役割定義         | 職種・グレード別の業務定義を管理   | `/api/job-roles`            |
| 他社求人・ベンチマーク | 競合他社の求人情報を管理           | `/api/competitor-jobs`      |
| 組織・体制管理         | 部門・役割・人員構成を管理         | `/api/organizations`        |
| 選考プロセス管理       | 選考フローと各ステップを管理       | `/api/selection-processes`  |
| 採用チャネル管理       | 採用チャネルの特性・効果を管理     | `/api/recruitment-channels` |
| FAQ 管理               | よくある質問と回答を管理           | `/api/faqs`                 |
| 履歴管理               | 全エンティティの変更履歴を参照     | `/api/history`              |
| 管理者機能             | 組織・ユーザー管理                 | `/api/admins`, `/api/users` |

## API 仕様

各エンティティは以下の CRUD 操作をサポートしています:

- `GET /api/{entity}` - 一覧取得
- `GET /api/{entity}/:id` - 個別取得
- `POST /api/{entity}` - 新規作成
- `PUT /api/{entity}/:id` - 更新
- `DELETE /api/{entity}/:id` - 削除

履歴 API は以下のクエリパラメータをサポート:

- `GET /api/history?entityId={id}&entityType={type}` - フィルタリング

## データベース設定（Cloudflare D1）

### ローカル開発

ローカル開発では、wrangler が D1 をエミュレートします。特別な設定は不要です。

```bash
# 開発サーバー起動時に自動的にローカルD1が使用されます
pnpm run dev --filter=@recruit-architect/backend
```

### 本番環境へのデプロイ

1. D1 データベースを作成:

```bash
cd apps/backend
npx wrangler d1 create recruit-architect-db
```

2. 出力された database_id を`wrangler.toml`の`[env.production]`セクションに設定:

```toml
[env.production]
vars = { ENVIRONMENT = "production" }

[[env.production.d1_databases]]
binding = "DB"
database_name = "recruit-architect-db"
database_id = "5d9c97bb-abc5-4be1-935a-149bae02d18b"
migrations_dir = "migrations"
```

3. マイグレーションを実行（本番環境）:

```bash
npx wrangler d1 migrations apply recruit-architect-db --env production
```

4. バックエンドをデプロイ:

```bash
npx wrangler deploy --env production
```

### フロントエンドのデプロイ（Cloudflare Pages）

1. フロントエンドをビルド:

```bash
cd apps/frontend
pnpm run build
```

2. Cloudflare Pages プロジェクトを作成（初回のみ）:

```bash
# Cloudflare にログイン（初回のみ、または認証が必要な場合）
npx wrangler login

# プロジェクトを作成（初回のみ）
npx wrangler pages project create recruit-architect-frontend
```

3. デプロイ:

```bash
# ビルド成果物をデプロイ
npx wrangler pages deploy dist --project-name=recruit-architect-frontend
```

4. 環境変数を設定（Cloudflare Dashboard から）:

- `VITE_API_URL`: バックエンド API の URL（例: `https://recruit-architect-api.your-subdomain.workers.dev`）

**注意**:

- `wrangler.toml` は環境別設定に対応しているため、ローカル開発と本番環境の設定を同じファイルで管理できます。ローカル開発時は `database_id = "local"` が自動的に使用され、本番デプロイ時は `--env production` フラグで本番設定が使用されます。
- フロントエンドの環境変数 `VITE_API_URL` は、ビルド時に埋め込まれるため、デプロイ前に設定するか、Cloudflare Pages の環境変数として設定する必要があります。

## 管理者機能

### 管理者ページ

管理者ページ (`/admin`) では以下の操作が可能です:

- **組織管理**: 組織の作成・編集・削除・停止
- **ユーザー管理**: 組織に紐づくユーザーの作成・編集・削除・パスワード設定

### 管理者の登録

管理者は CLI コマンドでのみ登録可能です:

```bash
# 管理者を作成するSQLを生成
cd apps/backend
pnpm run create-admin <email> <password> <name>

# 例
pnpm run create-admin admin@example.com password123 "Admin User"
```

生成された SQL を実行:

```bash
# ローカル環境
wrangler d1 execute recruit-architect-db --local --command "INSERT INTO admins ..."

# 本番環境
wrangler d1 execute recruit-architect-db --command "INSERT INTO admins ..."
```

## 注意事項

- **認証なし**: 現在、認証機能は実装されていません。本番環境では適切な認証を追加してください。
- **CORS 設定**: 開発用にすべてのオリジンを許可しています。本番環境では適切に制限してください。
- **パスワードハッシュ**: パスワードは SHA-256 + salt でハッシュ化されています。本番環境ではより安全な方法（bcrypt、argon2）の使用を推奨します。

## ライセンス

MIT
