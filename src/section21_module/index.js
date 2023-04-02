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
