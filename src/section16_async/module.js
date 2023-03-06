"use struct";
// type="module"のため、`await`式がトップレベルで使用できる
console.log("実行開始");
const startTime = Date.now();
// `await`を使用
await new Promise(resolve => setTimeout(resolve, 2000));
const diff = Date.now() - startTime;
console.log(`実行終了：${diff}ms経過しました`); // "実行終了：2004ms経過しました"