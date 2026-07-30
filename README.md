# nekosanq.net

[nekosanq.net](https://nekosanq.net) は、NekosanQのポートフォリオサイトです。

ダークトーンとエメラルドグリーンを基調に、ノードとエッジで構成した3Dネットワーク、猫のワイヤーフレーム、スクロール連動カメラ、タイピング演出を組み合わせています。

## 主な機能

- Home → About → Serviceのシングルページ構成
- React Three Fiberによるリアルタイム3D背景
- ノードとエッジで表現した猫モデル
- スクロール量に連動するカメラ移動とネットワークアニメーション
- マウス位置へ反応するノードとエメラルドのハイライト
- GSAPを利用したAbout・Service・SNSリンクの表示演出
- 段階的に進行するヒーローのタイピングアニメーション
- PC・タブレット・モバイル対応
- `prefers-reduced-motion`対応

## 技術構成

| 分類      | 使用技術                                    |
| --------- | ------------------------------------------- |
| Framework | Next.js 16 / React 19 / TypeScript          |
| Styling   | Tailwind CSS 3 / PostCSS                    |
| 3D        | Three.js / React Three Fiber / Drei         |
| Effects   | React Three Postprocessing / Postprocessing |
| Animation | GSAP / React Typed                          |
| Icons     | Font Awesome / Lucide React                 |
| Quality   | ESLint / Prettier                           |

## ディレクトリ構成

```text
src/
├─ app/
│  ├─ global.css
│  ├─ layout.tsx
│  └─ page.tsx
└─ components/
   ├─ network/
   │  ├─ CatWireModel.tsx
   │  ├─ catWireGeometry.ts
   │  └─ catWireShaders.ts
   ├─ CatNetworkBackdrop.tsx
   ├─ BigText.tsx
   ├─ Navbar.tsx
   ├─ Profile.tsx
   ├─ SkillsCard.tsx
   ├─ GroupAbout.tsx
   ├─ Service.tsx
   └─ SocialMediaLink.tsx

public/
└─ models/
   ├─ network-cat.glb
   └─ ATTRIBUTION.md
```

## ローカル開発

依存関係をインストールして開発サーバーを起動します。

```bash
npm ci
npm run dev
```

通常は `http://localhost:3000` で確認できます。ポートが使用中の場合、Next.jsは別の空きポートを使用します。

## コマンド

| コマンド         | 内容                                  |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Turbopackを使用して開発サーバーを起動 |
| `npm run lint`   | ESLintによる静的解析                  |
| `npm run format` | Prettierによるフォーマット            |
| `npm run check`  | ESLintとPrettierの検査                |
| `npm run build`  | 本番用ビルド                          |
| `npm run start`  | 本番ビルドを起動                      |

変更後は最低限、次の検証を実行してください。

```bash
npm run lint
npm run build
```

## 3Dモデル

猫のネットワーク表現には、Creative Commons Attribution 3.0で提供されているモデルを利用しています。出典とライセンスの詳細は [`public/models/ATTRIBUTION.md`](public/models/ATTRIBUTION.md) を参照してください。

モデルの元マテリアルやテクスチャは使用せず、ジオメトリをノードとエッジのネットワーク表現へ変換しています。

## ライセンスとアセット

ソースコードおよび画像アセットの再利用条件は、それぞれの権利者・ライセンスに従ってください。`NekosanQ.png`を含むプロフィール関連画像は、許可なく改変・再配布しないでください。
