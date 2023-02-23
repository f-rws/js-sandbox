"use strict";

// 非同期処理:Promise/Async Function

/*
    ・非同期処理もメインスレッドで実行される。
    ・JavaScriptでは一部を除き非同期処理は「並行処理」として扱われる。並行処理とは処理を単位ごとに分けて処理を切り替えながら実行することである。
    　そのため、非同期処理の前に重たい処理があると非同期処理の実行が遅れてしまうという現象が起きる。
    　・JavaScriptで並列処理を行える非同期処理は WebWorkerAPI が提供している。  */


/*
    非同期処理と例外処理
   ・同期処理では、`try...catch`を使用することで例外をキャッチできる。しかし、非同期処理の外から非同期処理内の例外処理を判定できない。そのため、非同期処理の中で例外
   　が発生したことを非同期処理の外に伝える必要がある。主な方法は以下の２パターンである。ちなみに、AsyncFunction は Promise の上に成り立っている。
   　・Promise
   　・AsyncFunction  */
// 同期的な例外処理
try {
    throw new Error("同期的なエラー");
} catch (error) {
    console.log("同期的なエラーをキャッチできる");
}
console.log("この行は実行されます");
// "同期的なエラーをキャッチできる"
// "この行は実行されます"

// 非同期的な例外処理
setTimeout(() => {
    try {
        throw new Error("非同期的なエラー");
    } catch (error) {
        console.log(error.message)
    }
}, 10);
console.log("この行は実行されます");
// "この行は実行されます"
// "非同期的なエラー"


/*
    Promise
    ・非同期処理の状態や結果を表現するビルドインオブジェクトである。
    ・Promiseを用いた非同期処理は大きく２つの処理から成り立っている。
    　・非同期処理をする部分：Promiseのインスタンスを返す。
    　・非同期処理の結果を扱う部分：Promiseのインスタンスを受け取り成功した際の処理と失敗した際の処理をコールバック関数で登録する。  */
    /*
        `Promise`インスタンスの作成
        ・`new Promise`のコンストラクタには非同期処理を行う`executor`と呼ばれるコールバック関数を渡す。`executor`の引数には`resolve`と`reject`が存在する。
        　非同期処理行い成功時に`resolve()`を呼び、失敗時に`reject()`を呼び出す。
        ・`Promise`インスタンスの`then`メソッドで成功時、失敗時の関数を登録する。第１引数に`resolve`（成功）時に呼ばれるコールバック関数、第二引数に`reject`（失敗）時のコールバック関数を渡す。  */
    const promiseA = new Promise((resolve, reject) => {
        resolve("成功");
        reject("失敗");
    });
    const onFulfilled = () => {
        console.log("resolveされたときに呼ばれる");
    };
    const onRejected = () => {
        console.log("rejectされたときに呼ばれる");
    };
    // `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
    promiseA.then(onFulfilled, onRejected);

    /*
         `Promise.prototype.then`と`Promise.prototype.catch`
         ・`Promise`インスタンスの`catch`メソッドを利用して失敗時の関数を登録できる。また、`then`メソッドの第二引数を利用するより`catch`メソッドを利用する方が推奨されている。   */
    const errorPromise = (message) => {
        return new Promise((resolve, reject) => {
            reject(new Error(message))
        })
    };
    // `then`メソッドを利用
    errorPromise("`then`メソッドを利用").then(undefined, (error) => {
        console.log(error.message); // "`then`メソッドを利用"
    });
    // `catch`メソッドを利用
    errorPromise("`catch`メソッドを利用").catch((error) => {
        console.log(error.message); // "`catch`メソッドを利用"
    });
    // `then`メソッドと`catch`メソッドを利用
    errorPromise("?")
        .then(undefined, error => {
            // `then`メソッドが優先される
            console.log(`then: ${error.message}`)  // "then: ?"
        })
        .catch(error => {
            // 処理されない
            console.log(`catch: ${error.message}`)
        });

    /*
        Promiseと例外
        ・Promise はコンストラクタ内で例外が発生した（`throw`された）場合、失敗として扱われ`reject`メソッドが呼ばれた場合と同じ挙動をする。そのため、`Promise`インスタンスでは
        　`then`メソッドの第二引数のコールバック関数、または`catch`メソッドのコールバック関数が呼び出される。  */
    const throwPromise = () => {
        return new Promise((resolve, reject) => {
            // `throw`された時点で`reject`を呼ぶ
            throw new Error("例外発生");
        })
    };
    throwPromise().catch(error => {
        console.log(error.message); // "例外発生"
    });

    /*
        Promiseの状態
        ・`Promise`インスタンスには、内部的に3つの状態が存在する。
        　・Fulfilled...`resolve`（成功）した時の状態。この際`onFulfilled`が呼ばれる。
        　・Rejected...`reject`（失敗）した時の状態。この際`onRejected`が呼ばれる。
        　・Pending...Fulfilled でも Rejected でもない状態。`new Promise`の初期の状態。
        ・`Promise`インスタンスは初期状態は Pending となり、一度でも Fulfilled または Rejected に変化すると、それ以降は状態を変化することない。
        ・`Promise`インスタンスの状態が変化した際に、一度だけ呼ばれるコールバック関数を登録するのが`then`や`catch`メソッドになる。
        ・`then`や`catch`メソッドは既に状態が変化済みの`Promise`インスタンスに対してもコールバック関数を後から登録できる。状態が変化済みの`Promise`インスタンスに登録した
        　コールバック関数も非同期処理として呼ばれる  */
        /*
            `Promise.resolve`
            ・Fulfilled の状態となった`Promise`インスタンスを生成する。
            ・状態が変化済みになった`Promise`インスタンスに対して、`then`メソッドに登録するコールバック関数は常に非同期処理として実行される。  */
        const fulfilledPromise1 = Promise.resolve();
        // `Promise.resolve`メソッドの糖衣構文となる
        const fulfilledPromise2 = new Promise((resolve) => {
            resolve();
        });
        // 引数に`resolve`される値をセットできる
        const fulfilledPromise3 = Promise.resolve("成功");
        fulfilledPromise3.then(value => {
            console.log(value)  // "成功"
        });
        // 常に非同期で処理される
        const fulfilledPromise4 = Promise.resolve();
        fulfilledPromise4.then(() => {
            console.log("2. `fulfilledPromise4`のコールバック関数実行");
        });
        console.log("1. `fulfilledPromise4`の前に実行");
        // "1. `fulfilledPromise4`の前に実行"
        // "2. `fulfilledPromise4`のコールバック関数実行"

        /*
            `Promise.reject`
            ・Rejected の状態となった`Promise`インスタンスを生成する。
            ・状態が変化済みになった`Promise`インスタンスに対して、`catch`メソッドに登録するコールバック関数は常に非同期処理として実行される。  */
        const rejectedPromise1 = Promise.reject(new Error("エラー"));
        // `Promise.reject`メソッドの糖衣構文となる
        const rejectedPromise2 = new Promise((_, reject) => {
            reject(new Error("エラー"));
        });

        // ・`Promise.resolve`や`Promise.reject`は短くかけるため、テストコードなどで利用されることがある。
        // ・`Promise.reject`は Promise チェーンにおいて、Promise の状態を操作するのに利用できる。

































