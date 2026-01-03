# アーキテクチャ概要

本ドキュメントは、本プロジェクトにおける **全体アーキテクチャ方針・技術選定・責務分離** を整理し、実装の共通認識とすることを目的とする。

---

## 1. 全体構成

```
[ Browser (React + Vite) ]
            ↓ HTTPS
[ Backend API (Hono / Cloudflare Workers) ]
            ↓
[ External Services ]
  - AI API (OpenAI / Claude 等)
  - DB (Neon / Supabase)
```

* フロントエンドとバックエンドは **明確に分離** する
* バックエンドは **BFF ではなく汎用 Backend API** として設計する
* フロントエンドは完全に Stateless とする

---

## 2. 技術スタック

### フロントエンド

* React
* Vite
* TypeScript
* Hosting: Cloudflare Pages

### バックエンド

* TypeScript
* Hono
* Runtime: Cloudflare Workers
* OpenAPI (zod-openapi)

### 共通

* Monorepo (pnpm workspace + turborepo)
* OpenAPI を Single Source of Truth とする

---

## 3. モノレポ構成

```
repo/
├── apps/
│   ├── frontend/        # React + Vite
│   └── backend/         # Hono API
├── packages/
│   ├── openapi/         # OpenAPI + Zod 定義
│   ├── api-client/      # 自動生成 API クライアント
│   └── shared/          # 共通ユーティリティ（任意）
```

### 方針

* **API仕様は packages/openapi に集約**
* Backend / Frontend は直接型を共有しない
* 仕様変更は OpenAPI から伝播させる

---

## 4. Backend アーキテクチャ

### レイヤ構成

```
apps/backend/src/
├── index.ts            # エントリーポイント
├── routes/             # HTTP レイヤ
├── services/           # ユースケース / ビジネスロジック
├── adapters/           # 外部API (AI, DB)
├── domain/ (optional)  # ドメインモデル
```

### レイヤ責務

#### routes/

* HTTP / OpenAPI に依存
* リクエスト検証
* 認証・認可
* service 呼び出し

#### services/

* アプリケーションロジック
* トランザクション制御
* AI処理のオーケストレーション

#### adapters/

* AI API
* DB
* 外部サービス

---

## 5. OpenAPI 運用方針

* Zod を使って型とバリデーションを定義
* OpenAPI Spec を自動生成
* フロントエンド用クライアントを自動生成

### メリット

* 型の二重管理を防ぐ
* Backend / Frontend の独立性を維持
* 仕様変更の影響範囲が明確

---

## 6. セキュリティ方針

### 基本原則

* Secret はすべて Backend のみに保持
* フロントエンドは DB / AI API を直接呼ばない

### 認証・認可

* 認証: JWT / OAuth / 外部 Auth Provider
* 認可: Backend で必ず実施

---

## 7. AI 機能の位置付け

### 方針

* AI 呼び出しは Backend に集約
* Prompt / Model 選択は service 層で管理

### 将来拡張

* 重い AI 処理は Python Worker として切り出し可能
* Backend とは HTTP / Queue で連携

---

## 8. デプロイ方針

### Backend

* Cloudflare Workers
* wrangler によるデプロイ

### Frontend

* Cloudflare Pages
* GitHub 連携による自動デプロイ

---

## 9. 設計方針まとめ

* **シンプル・明示的・段階的拡張**
* フレームワーク依存を最小限に
* AI機能は疎結合に保つ
* 将来の Backend 分離・言語追加を阻害しない

---

このドキュメントをベースに実装を進めることとする。
