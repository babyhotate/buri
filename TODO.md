# Post.jsのリファクタリング
## 目的
- モデル的な性質とリポジトリ的な性質を分離する

## ステップ
- [x] PostRepositoryクラスを作成（Postモデルはまだ登場しない）
- [x] Postモデルを作成
- [x] PostRepositoryがPostモデルを返したり、受け取ったりするようにする
- [x] app.jsも↑の変更に追従する