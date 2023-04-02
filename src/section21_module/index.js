"use strict";

// ECMAScriptモジュール

// import と export には「名前付き」と「デフォルト」の２種類の方法がある。

/*
    名前付きエクスポート／インポート
    ・名前付きエクスポートには2パターンある
    　・宣言済みの変数や関数をエクスポートする
    　・宣言と同時にエクスポートする
    ・エイリアスという仕組みがあり、任意の名前でインポートすることができる。エイリアスを使用する際は`as`を使用する。  */
import {foo} from "./named-export.js";
import {bar} from "./named-export-declare.js";
console.log(foo); // "foo"
bar();
// 名前つきエクスポート／インポートのエイリアス
import {foo2} from "./named-export-alias.js";
import {foo2 as foo3} from "./named-export-alias.js";
console.log(foo2) // "foo2"
console.log(foo3) // "foo2"


/*
    デフォルトエクスポート／インポート
    ・モジュールごとに１つしか定義できないエクスポート。複数のデフォルトエクスポートを定義すると"A module cannot have multiple default exports"と注意される。
    ・定義の方法が２パターンある。
    　・宣言済みの変数や関数をエクスポートする。
    　・宣言と同時にエクスポートする。この時、関数名やクラス名を省略可能である。ただし、変数の場合は宣言と同時にデフォルトエクスポートできない。
    　　理由としてはカンマ区切りで複数の宣言が可能なためである。
    ・デフォルトインポートは任意の名前をつけてインポートする。
    ・デフォルトエクスポートは`default`という固有の名前による名前付きエクスポートと同じである。そのため、名前付きインポートでも`xxx as default`と
    　エイリアスを用いることでデフォルトエクスポートすることができる。
    ・名前付きインポートでも`default as xxx`を用いることで、デフォルトエクスポートされた宣言に対してデフォルトインポートすることが可能である。  */
import hoge from "./default-export.js";
import hoge2 from "./default-export-alias.js";
console.log(hoge); // "hoge"
console.log(hoge2); // "hoge2"

import {default as obj1} from "./default-import-alias.js";
console.log(obj1); // {key: 'value'}

/*
    再エクスポート
    ・別のモジュールからエクスポートされたものを自身と通してエクスポートし直すこと。複数のモジュールをまとめたモジュールを作るときなどに用いられる。  */


/*
    全てをインポート
    ・`import * as`構文で全ての名前付きインポートをまとめてインポートする。この方法では1つのモジュールがオブジェクトと同様の振る舞いをする。  */
import * as myFavorite from "./all-import.js";
console.log(myFavorite.teamName); // "arsenal"
myFavorite.arteta(); // "アルテタ"
console.log(myFavorite.default); // {fw: ["ジェズス"]}


/*
    ECMAScriptモジュールを実行する
    ・type="module"属性を付与する。=> `<script src="./index.js" type="module"></script>`  */