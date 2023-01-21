"use strict";

// 関数とthis

// this は基本的にメソッドの中で利用するが、読み取り専用のグローバル変数のようなモノでどこにでも記述できる。加えて this の参照先（評価結果）は以下の条件によって変化する。
// ・実行コンテキストにおける this
// ・コンストラクタにおける this
// ・関数とメソッドにおける this
// ・ArrowFunction における this

/*
* 実行コンテキストと this
* ・トップレベルにある this は実行コンテキストによって参照する値が異なる。
* ・実行コンテキストは"Script"と"Module"が存在する
* 　・"Module" にするには <script> の type属性に"module"を指定する */

  /* Script における`this`はグローバルオブジェクトを参照する
     ・ブラウザなら`Window`オブジェクト、Node.js なら`Global`オブジェクトを参照する*/
    console.log(this) // Window{...}

  /* Module における`this`は`undefined`となる */

  /* グローバルオブジェクトを参照したいのであれば`this`ではなく、`globalThis`を使用する */
    console.log(globalThis) // Window{...}