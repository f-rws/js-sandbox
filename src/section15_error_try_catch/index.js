"use strict";

// 例外処理

/*
    ・`try`ブロック内で例外が発生すると以降の処理は実行されず、`catch`節を処理しに移動する。`finally`節は`try`節の終了後に必ず実行される。
    ・`catch`節または`finally`節のどちらかが存在していれば良い。そのため以下の組み合わせが可能である。
    　・`try`...`catch`
    　・`try`...`finally`
    　・`try`...`catch`...`finally`  */

/*
     throw文
     ・`throw`を用いてユーザーが意図的に例外を投げることが可能である。投げられた例外は`catch`節の引数からアクセスすることができる。  */
try {
    throw new Error("例外");
} catch (error) {
    console.log(error.message);  // 例外
}


/* エラーオブジェクト */
    /*
         Error
         ・`new Error("エラーメッセージ")`で作成できる。渡したエラーメッセージは`message`プロパティから参照できる。
         ・`throw`文を投げる際は`Error`オブジェクトを使用することを推奨している。理由はスタックトレースが表示されデバッグしやすくなるため。   */

    /*
        ビルドインエラー
        ・ECMAScript使用や実行環境に組み込みで定義されているエラーオブジェクトである。これらは`Error`オブジェクトを継承したオブジェクトのインスタンスである。
        ・代表的なビルドインエラー
        　・ReferenceError...存在しない変数や関数を参照した際のエラー
        　・SyntaxError...構文的に不正なコードを解釈しようとした際のエラー。JavaScript実行前のパースの段階で発生する。
        　・TypeError...存在しない変数や関数を参照した際のエラー    */
    // TypeError
    try {
        const fn = {};
        fn();
    } catch (error) {
        console.log(error instanceof TypeError) // true
        console.log(error.name) // "TypeError"
        console.log(error.message) // "fn is not a function"
    }

    /*
        ビルドインエラーを投げる
        ・`Error`オブジェクトのように`new`演算子を用いてビルドインエラーオブジェクトのインスタンスを作成できる。    */
    function lengthStr(str) {
        if(typeof str !== "string") {
            throw new TypeError(`${str} is not a string`)
        }
        return str.length;
    }

    try {
        // 数値を渡す
        lengthStr(100);
    } catch (error) {
        console.log(error instanceof TypeError) // true
        console.log(error.name) // "TypeError"
        console.log(error.message) // "100 is not a string"
    }


/*
    エラーとデバッグ
    ・エラーは全て`Error`オブジェクトを拡張したオブジェクトで宣言されている。そのため、`name`と`message`プロパティを持っている。また、メッセージの後には例外のスタックトレースが表示される。
    ・スタックトレースとは、どの処理によってエラーが発生したのかを書かれている。エラーがどのように発生したかを上から下にそってたどれるようになっている。  */


/*
    `console.error`とスタックトレース
    ・ エラーに関するログ出力したい際に`console.error`を用いることでメッセージとスタックトレースを表示することができ、デバッグしやすくなる。  */