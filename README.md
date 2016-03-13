## nslides

Rails5の新機能ActionCableを利用したスライド共有システム「nslides」のプロトタイプです。

### 構成

* panel
    * Railsアプリ本体
* parser
    * AWS Lambdaで動作するPDFパーサー (未実装)
* provision
    * インフラ、ミドルウェア設定のためのAnsible playbook
