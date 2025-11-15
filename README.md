# holiday-jp-firebase

日本の祝日を判定するライブラリ（[@sway11466/holiday-jp-npm](https://www.npmjs.com/package/@sway11466/holiday-jp-npm)）をFirebase Functionsで呼び出すWebサービスです。

## 概要

このプロジェクトは、指定された日付が日本の祝日、平日、週末のいずれであるかを判定するREST APIを提供します。Firebase Functions (Cloud Functions for Firebase) を使用してサーバーレスで動作し、日本標準時（JST）での日付判定を行います。

## 機能

- **祝日判定**: 指定日が日本の祝日かどうかを判定
- **平日判定**: 指定日が平日（週末・祝日でない日）かどうかを判定
- **週末判定**: 指定日が週末（土曜日または日曜日）かどうかを判定
- **JST対応**: すべての判定は日本標準時（JST）で行われます
- **デフォルト日付**: 日付パラメータが未指定の場合、サーバーの日付をJST換算で使用

## 技術スタック

- **ランタイム**: Node.js
- **言語**: TypeScript
- **プラットフォーム**: Firebase Functions (Cloud Functions v2)
- **リージョン**: asia-northeast1
- **依存ライブラリ**: [@sway11466/holiday-jp-npm](https://www.npmjs.com/package/@sway11466/holiday-jp-npm)

## プロジェクト構造

```
holiday-jp-firebase/
├── functions/           # Firebase Functions コード
│   ├── src/
│   │   ├── index.ts    # エントリーポイント
│   │   ├── holiday.ts  # 祝日判定API
│   │   ├── weekday.ts  # 平日判定API
│   │   └── weekend.ts  # 週末判定API
│   ├── package.json    # 依存関係
│   └── tsconfig.json   # TypeScript設定
├── firebase.json       # Firebase設定
├── openapidoc.yml      # OpenAPI仕様書
├── LICENSE             # MITライセンス
└── README.md          # このファイル
```

## セットアップ

### 前提条件

- Node.js (推奨: v18以上)
- npm
- Firebase CLI (`npm install -g firebase-tools`)
- Firebaseプロジェクト

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/sway11466/holiday-jp-firebase.git
cd holiday-jp-firebase

# 依存関係をインストール
cd functions
npm install
```

## 開発

### ビルド

```bash
cd functions
npm run build
```

### リント

```bash
cd functions
npm run lint
```

### ローカルエミュレータで実行

```bash
cd functions
npm run serve
```

### デプロイ

```bash
cd functions
npm run deploy
```

## API使用方法

### 祝日判定API

指定日が祝日であるか判定します。

**エンドポイント**: `https://holiday-v3na3wloca-an.a.run.app/`

**パラメータ**:
- `date` (オプション): 判定する日付（形式: YYYY-MM-DD）。省略時は本日（JST）。

**例**:
```bash
curl "https://holiday-v3na3wloca-an.a.run.app/?date=2024-01-01"
```

**レスポンス（祝日の場合、200 OK）**:
```json
{
  "holiday": true,
  "year": 2024,
  "month": 1,
  "date": 1,
  "name": "元日",
  "iso-date": "2024-01-01T00:00:00+09:00"
}
```

**レスポンス（祝日でない場合、404 Not Found）**:
```json
{
  "holiday": false,
  "year": 2024,
  "month": 1,
  "date": 2,
  "name": "",
  "iso-date": "2024-01-02T00:00:00+09:00"
}
```

### 平日判定API

指定日が平日（週末・祝日でない日）であるか判定します。

**エンドポイント**: `https://weekday-v3na3wloca-an.a.run.app/`

**パラメータ**:
- `date` (オプション): 判定する日付（形式: YYYY-MM-DD）。省略時は本日（JST）。

**例**:
```bash
curl "https://weekday-v3na3wloca-an.a.run.app/?date=2024-01-09"
```

**レスポンス（平日の場合、200 OK）**:
```json
{
  "weekday": true,
  "year": 2024,
  "month": 1,
  "date": 9,
  "iso-date": "2024-01-09T00:00:00+09:00"
}
```

**レスポンス（平日でない場合、404 Not Found）**:
```json
{
  "weekday": false,
  "year": 2024,
  "month": 1,
  "date": 1,
  "iso-date": "2024-01-01T00:00:00+09:00"
}
```

### 週末判定API

指定日が週末（土曜日または日曜日）であるか判定します。

**エンドポイント**: `https://weekend-v3na3wloca-an.a.run.app/`

**パラメータ**:
- `date` (オプション): 判定する日付（形式: YYYY-MM-DD）。省略時は本日（JST）。

**例**:
```bash
curl "https://weekend-v3na3wloca-an.a.run.app/?date=2024-01-07"
```

**レスポンス（週末の場合、200 OK）**:
```json
{
  "weekend": true,
  "year": 2024,
  "month": 1,
  "date": 7,
  "iso-date": "2024-01-07T00:00:00+09:00"
}
```

**レスポンス（週末でない場合、404 Not Found）**:
```json
{
  "weekend": false,
  "year": 2024,
  "month": 1,
  "date": 9,
  "iso-date": "2024-01-09T00:00:00+09:00"
}
```

## エラーレスポンス

### 400 Bad Request

不正な日付形式が指定された場合:
```bash
curl "https://holiday-v3na3wloca-an.a.run.app/?date=invalid"
```
```
bad date format.
```

## API仕様

詳細なAPI仕様は [openapidoc.yml](./openapidoc.yml) をご参照ください。

## ライセンス

このプロジェクトは [MIT License](./LICENSE) の下で公開されています。

## 作者

Sway11466 (sway11466@gmail.com)
