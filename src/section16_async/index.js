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

    /*
        Promiseチェーン
        ・`Promise`インスタンスの`then`と`catch`メソッドは常に新たな`Promise`インスタンスを返している。これにより、`then`と`catch`メソッドの後に
        　連続する`then`メソッドを登録できる。
        ・`Promise`状態が Rejected になった場合、最も近い失敗時の処理が呼び出される。
        ・`then`と`catch`メソッド内で例外が発生した時点で Rejected な`Promise`インスタンスを返す。
        ・`catch`メソッドは Fulfilled な`Promise`インスタンスを返す。   */
    // Rejected になった場合、最も近い`catch`メソッドが呼ばれる
    const rejectedPromise3 = Promise.reject(new Error("rejectedPromise3: エラー"));
    rejectedPromise3
        .then(() => {
            // 呼ばれない
        })
        .then(() => {
            // 呼ばれない
        })
        .catch(error => {
            console.log(error.message); // "rejectedPromise3: エラー"
        });

    // 例外が発生すると Rejected な`Promise`インスタンスを返す
    Promise.resolve()
        .then(() => {
            throw new Error("例外が発生したため、最も近い`catch`メソッドに投げられる")
        })
        .then(() => {
            // 呼ばれない
        })
        .catch(error => {
            console.log(error.message); // "例外が発生したため、最も近い`catch`メソッドに投げられる"
        });

    // catch`メソッドは Fulfilled な`Promise`インスタンスを返す
    const rejectedPromise4 = Promise.reject(new Error("rejectedPromise4: エラー"));
    rejectedPromise4
        .catch(error => {
            console.log(error.message); // "rejectedPromise4: エラー"
        })
        .then(() => {
            console.log("`catch`メソッドは fulfilled な`Promise`インスタンスを返す"); // "`catch`メソッドは fulfilled な`Promise`インスタンスを返す"
        });
    // 内部プロパティ`[[PromiseState]]`を確認
    const rejectedPromise4AfterCatch = rejectedPromise4.catch(error => {});
    console.log("rejectedPromise4AfterCatch", rejectedPromise4AfterCatch) // {[[PromiseState]]:  "fulfilled", ...}
    // `catch`内で`throw`した場合
    const rejectedPromise5 = Promise.reject(new Error("rejectedPromise5: エラー"));
    rejectedPromise5
        .catch(error => {
            console.log(error.message); // "rejectedPromise5: エラー"
            // `throw`を投げているため、再び`catch`に投げられる
            throw new Error("'rejectedPromise5: エラー後'表示後に`catch`に投げられる");
        })
        .then(() => {
            // 呼ばれない
        })
        .catch(error => {
            console.log(error.message); // "'rejectedPromise5: エラー後'表示後に`catch`に投げられる"
        });

        /*
            Promiseチェーンで値を返す
            ・`then`や`catch`メソッドのコールバック関数は文字列、数値、オブジェクトなどの値を返せる。返した値は次の`then`メソッドの引数に渡される。  */
        Promise.resolve(1)
            .then(value => {
                console.log(value); // 1
                return value * 2;
            })
            .then(value => {
                console.log(value); // 2
            });
        // `catch`メソッドの場合
        Promise.reject(new Error("失敗"))
            .catch(error => {
                // 状態が Fulfilled の`Promise`インスタンスを返すため、値を引き継げる
                return 3;
            })
            .then(value => {
                console.log(value); // 3
            });

        /*
            コールバック関数で`Promise`インスタンスを返す
            ・通常`catch`メソッドのあとは`then`メソッドが呼ばれる。これはコールバック関数が任意の値を返すと、その値で`resolve`された`Promise`インスタンスを返すからである。
            　しかし、明示的に`Promise`インスタンスを返す場合は例外である。  */
        Promise.reject(new Error("test: コールバック関数で`Promise`インスタンスを返す"))
            .catch(error => {
                return Promise.reject(new Error(`${error.message} => 失敗`))
            })
            .then(() => {
                // 呼ばれない
            })
            .catch(error => {
                console.log(error.message); // "test: コールバック関数で`Promise`インスタンスを返す => 失敗"
            });

    /*
        Promiseチェーンで逐次処理
        ・`then`メソッドを繋いでいくことで連続する非同期処理に対応できる。    */
        /*
            `Promise.all`で複数のPromiseをまとめる
            ・`Promise.all`メソッドを利用することで複数の非同期処理をまとめて処理できる。全て成功すれば Fulfilled 状態の`Promise`インスタンスを返し、
           　　1つでも失敗すれば Rejected 状態の`Promise`インスタンスを返す。成功した場合は配列の`Promise`インスタンスを返す。  */
        function dummyFetch(path) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(path.startsWith("/resource")) {
                        resolve({body: `Response body of ${path}`});
                    } else {
                        reject (new Error("NOT FOUND"));
                    }
                }, 1000);
            })
        }
        // 成功時
        const fulfilledPromiseAll = Promise.all([
            dummyFetch("/resource/A"),
            dummyFetch("/resource/B")
        ]);
        fulfilledPromiseAll
            .then(res => {
                console.log(res[0])  // {body: 'Response body of /resource/A'}
                console.log(res[1])  // {body: 'Response body of /resource/B'}
            });
        // 失敗時
        const rejectedPromiseAll = Promise.all([
            dummyFetch("/resource/A"),
            dummyFetch("/not_found/B")
        ]);
        rejectedPromiseAll
            .then(() => {
                // 呼ばれない
            })
            .catch(error => {
                console.log(error.message);  // "NOT FOUND"
            });

        /*
            `Promise.race`
            ・複数の`Promise`インスタンスを受け取り、1つでも完了した（Settled 状態になった）時点で単数の`Promise`インスタンスを返す。
            　返り値の`Promise`インスタンスの状態は Fulfilled にも Rejected にもなり得る。  */
        function delay(timeoutMs) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(timeoutMs);
                }, timeoutMs)
            })
        }
        const fulfilledPromiseRace = Promise.race([
            delay(1),
            delay(32),
            delay(64),
        ]);
        fulfilledPromiseRace.then(value => {
            // 最も早く完了した`Promise`インスタンスが返ってくる
            console.log(value); // 1
        })


/*
    Async Function
    ・必ず`Promise`インスタンスを返す。  */
// doAsyncA関数は`Promise`インスタンスを返している
async function doAsyncA() {
    return "doAsyncA: 値";
}
doAsyncA().then(value => {
    console.log(value); // "doAsyncA: 値"
});
// 上記の AsyncFunction は以下と同等である
function doAsyncB() {
    return Promise.resolve("doAsyncB: 値");
}
doAsyncB().then(value => {
    console.log(value); // "doAsyncB: 値"
});

/*
    Async Function の定義
    ・以下のパターンが存在する
    　・関数宣言
    　・functionキーワードを用いた関数式
    　・Arrow Function
    　・メソッド  */
// 関数宣言
async function fn1() {}
// functionキーワードを用いた関数式
const fn2 = async function fn2() {};
// Arrow Function
const fn3 = async () => {};
// メソッド
const obj = {
    async method() {}
};

/*
    Async Function は Promise を返す
    ・Async Function は必ず`Promise`インスタンスを返すが、具体的に次の3つがある。
    　1. 値を`return`した場合、Fulfilled な`Promise`インスタンスを返す。何も`return`していない場合は`undefined`を返したのと同じ扱いになる。
    　2. 例外が発生した場合、そのエラーを持つ Rejected な`Promise`インスタンスを返す。
    　3. Promise を`return`する場合、そのまま`Promise`インスタンスを返す。  */
// 1. Fulfilled な`Promise`インスタンスを返す場合
async function resolveFn() {
    return "Fulfilled";
}
resolveFn().then(value => {
    console.log(value); // "Fulfilled"
});
// 2. Rejected な`Promise`インスタンスを返す場合
async function rejectedFn() {
    throw new Error("Rejected")
}
rejectedFn().catch(error => {
    console.log(error.message); // "Rejected"
});
// 3. Promise をそのまま`return`する場合
async function promiseFn() {
    return Promise.resolve("`Promise`インスタンスを返している")
}
promiseFn().then(value => {
    console.log(value); // "`Promise`インスタンスを返している"
});

/*
    `await`式
    ・`await`式は以下の個所で使用可能である。
    　・Async Function関数の直下
    　・ECMAScriptモジュールの直下
    ・`await`式は右辺の`Promise`インスタンスが Fulfilled または Rejected になり完了するまで処理を待ってくれる。
    　・Fulfilled の場合、resolve された値を返す。
    　・Rejected の場合、その場でエラーを`throw`する。結果として Async Functionは Rejected な`Promise`インスタンスを返す。  */
// Fulfilled の場合
async function asyncResolveA() {
    const value = await Promise.resolve("asyncResolveA");
    console.log(value); // "asyncResolveA"
}
asyncResolveA();
// 上記と同じ意味になる
async function asyncResolveB() {
    return Promise.resolve("asyncResolveB").then(value => {
        console.log(value); // "asyncResolveB"
    });
}
asyncResolveB();

// Rejected の場合
async function asyncRejectA() {
    // エラーが発生したため、`throw`が投げられる
    const value = await Promise.reject(new Error("asyncRejectA()でエラー発生"));
    // 例外が発生したため、この処理は実行されない
}
asyncRejectA().catch(error => {
    console.log(error.message); // "asyncRejectA()でエラー発生"
});
// `await`式がエラー時に`throw`を投げるということは`try...catch`構文を使用し、`asyncRejectA()`内でエラーをキャッチすることができる
async function asyncRejectB() {
    try {
        // エラーが発生したため、`throw`が投げられる
        const value = await Promise.reject(new Error("asyncRejectB()でエラー発生"));
        // 例外が発生したため、この処理は実行されない
    }
    catch (error) {
        console.log(error.message); // "asyncRejectB()でエラー発生"
    }
}
asyncRejectB()
    .then(value => {
        // `asyncRejectB`はFulfilled な`Promise`インスタンスを返してる
        console.log(value); // undefined
    })
    .catch(error => {
        // 既に`asyncRejectB`内でエラーがキャッチされているため、こちらの処理は実行されない
    });
































