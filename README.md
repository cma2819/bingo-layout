zelda-party is a [NodeCG](http://github.com/nodecg/nodecg) bundle. 

It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^1.1.1`

You will need to have an appropriate version of NodeCG installed to use it.

# インストール

## NodeCGのインストール
本ファイルはNodeCGの"bundle"ファイルです。

[NodeCGのインストールページ](https://nodecg.com/index.html#install)に従って、下記コマンドを入力するところまで実施してください。

```
npm install -g bower
git clone https://github.com/nodecg/nodecg.git
cd nodecg
npm install --production
bower install
node index.js
```

## bundleの配置
Node.js及びNodeCGのインストールが完了したら、本プログラムをダウンロードしてください。

GitHub（恐らくみなさんが見ているであろうページ）の右上あたり、

「Clone or download」→「Download ZIP」でダウンロードできます。

展開した本ファイルを、NodeCGの「budle」フォルダに格納してください。

```
例：
bundles
└─zelda-party
  └─dashboard
  └─・・・
```

格納したら、「zelda-party」フォルダでコマンドプロンプトを起動し、「npm install」及び「bower install」を実行してください。

```
> cd \bundles\zelda-party
> npm install
> bower install
```

以上でインストールは終了（のはず）です。

## NodeCGの起動
NodeCGをインストールしたフォルダで、以下のコマンドを入力し、NodeCGを起動します。

```
> node index.js
```

表示されるlocalhostのアドレスにアクセスすることで、操作が可能になります。
