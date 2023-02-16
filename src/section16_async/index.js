"use strict";

// 非同期処理:Promise/Async Function

/*
    ・非同期処理もメインスレッドで実行される。
    ・JavaScriptでは一部を除き非同期処理は「並行処理」として扱われる。並行処理とは処理を単位ごとに分けて処理を切り替えながら実行することである。
    　そのため、非同期処理の前に重たい処理があると非同期処理の実行が遅れてしまうという現象が起きる。
    　・JavaScriptで並列処理を行える非同期処理は WebWorkerAPI が提供している。  */


/* 非同期処理と例外処理
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