"use strict";

// 関数とスコープ

/*
* スコープチェーン
* ・スコープは以下の順番で変数を探索する
* 　1. INNER に変数が宣言されているか。無い場合は 2. へ
* 　2. OUTER に変数が宣言されているか。無い場合は 3. へ
* 　3. 一番外側（スコープが無い箇所）に変数が宣言されているか。
*/
const x = "global";
{
  // OUTER
  const x = "outer";
  {
    // INNER
    const x = "inner";
    console.log(x); // "inner"
  }
  console.log(x); // "outer"
}
console.log(x); // "global"


/*
* グローバルスコープ
* ・グローバルスコープには自分が定義した変数の他にデフォルトでビルドインオブジェクトが宣言されている。以下2つがビルドインオブジェクトにあたる。
* 　・ECMAScript の Array や RegExp などのコンストラクタ関数や undefined などの変数、isNaN のような関数など。
* 　・実行環境（ブラウザや Node.js など）に定義されている document や module。
* ・自分が定義した変数名とビルドインオブジェクトが被った場合、自分が定義した変数が優先される。そのため、以下のようなエラーが発生する。
*/
const Array = "stringArray";
{
  // console.log(Array.from([1, 2, 3])) // Uncaught TypeError: Array.from is not a function
}

/*
* 関数スコープとvarの巻き上げ
* ・var の巻き上げを理解するには「宣言」と「代入」から構成されると考える
* 　・宣言は近い関数、またはグローバルスコープの先頭に巻き上げられる
* 　・代入は部分はそのままの位置に残る
* ・let, const は巻き上げが起きないため、読み込んだ時点でエラー（ReferenceError）を吐く。
*/
// let の場合
// console.log(x3); // Uncaught ReferenceError: Cannot access 'x3' before initialization
let x3 = "let_x3";

/*
* 1. グローバルスコープ
*/
console.log(x1); // undefined
var x1 = "var_x1";

// 上記は以下と同様のことを行っている。
// スコープの先頭に宣言が巻き上げられる
var x2;
console.log(x2); // undefined
// 代入部分がそのままの位置に残る
x2 = "var_x2";


/*
* 2. 関数の先頭に巻き上げられた場合
*/
var x5 = 100;
function a(){
  console.log( x5 ); // undefined

  var x5 = 200;
  console.log( x5 ); // 200
}
a();

// 上記は以下と同様のことを行っている。
var x6 = 100;
function a2(){
  // 最も近い関数の先頭に宣言が巻き上げられる
  var x6;
  console.log( x6 ); // undefined

  var x6 = 200;
  console.log( x6 ); // 200
}
a2();

/*
* 3. 変数の巻き上げはブロックスコープを無視した場合
*/
function fn() {
  // 内側のスコープを参照できる
  console.log(x4); // => undefined
  {
    var x4 = "varのx4";
  }
  console.log(x4); // => "varのx"
}
fn();


/*
* 関数宣言と巻き上げ
* ・function キーワードによる関数宣言も関数が実行された時点で、近い関数、またはグローバルスコープの先頭に巻き上げられる */
  // testFn() の宣言が巻き上げられている
  testFn(); // "testFn"
  function testFn() {
    return console.log("testFn");
  }


/*
* クロージャー
*/
  /* 静的スコープ
   ・JavaScript はどの識別子がその変数を参照するかコードを実行する前にわかっている。*/
    const x7 = 10; // *1

    function printX7() {
      console.log(x7); // 10
    }
    function run() {
      const x7 = 20; // *2
      printX7();
    }
    run();
    // printX7() の x7 は以下の順番で名前解決されている
    // ① printX7 の関数内に x7 が定義されていない。
    // ② グローバルスコープに定義されている const x7 = 10; を参照する。
    // 静的（run() 関数が実行されていない時）に名前解決するため、グローバルスコープに定義されている変数を参照している。
    // 静的スコープの仕組みは function キーワードを使用した関数宣言、メソッド、アロー関数など全ての関数で共通している性質である。

  /* メモリ管理の仕組み
   ・JavaScript はメモリの解放にガベージコレクションを採用している。
   ・ガベージコレクションとは...どこからも参照されなくなったデータを不要なデータと判断し、メモリ上から解放する仕組みのこと。 */

    let x8 = "before text";
    x8 = "after text";
    // この際に "before text" はどこからも参照されなくなる。
    // その後、ガベージコレクションによってメモリ上から解放される

    /* ガベレージコレクションと関数
     ・「関数内で定義したデータ」が解放されるパターンは２パターンある。
     　・関数が終了した際に解放される場合
     　・関数が終了しても解放されない場合 */

      /* 関数が終了した際に解放される場合 */
      function printY() {
        const y = "y";
        console.log(y); // "y"
      }
      printY();
      // この時点で "y" は参照されなくり解放される

      /* 関数が終了した際に解放される場合 */
      function createArray() {
        const tempArray = [1, 2, 3];
        return tempArray;
      }
      const array = createArray();
      console.log(array); // [1, 2, 3]
      // 変数 array が [1, 2, 3] という値を参照しているため解放されない

  /* クロージャーがなぜ動くのか
    ・「静的スコープ」と「メモリ管理の仕組み」を利用し、関数内から特定の変数を参照し続けることによってクロージャーは成り立っている。
    */
    const createCounter = () => {
      let count = 0;
      return function increment() {
        // createCounter() 関数で定義されている count を参照し続ける
        count = count + 1;
        return count;
      };
    };
    // counter 変数に increment() 関数が代入される。
    const counter = createCounter();
    console.log(counter()) // 1
    console.log(counter()) // 2
    // ① counter 変数は increment() 関数を参照している。
    // ② counter 変数は increment() 関数を経由して count 変数を参照している。
    // ③ counter 変数を実行後も increment() 関数は参照され続けている。つまり、count の状態も保持されたママになる
    // counter -> increment -> count

  /* クロージャーの用途
    ・関数に状態を持たせる手段として
    ・外から参照できない変数を定義する手段として
    ・グローバル変数を減らす手段として
    ・高階関数の一部分として */

    /* グローバル変数を減らす手段 */
    const createCounter2 = () => {
      // 外のスコープから`privateCount`を直接参照できない
      let privateCount = 0;
      return () => {
        privateCount++;
        return `${privateCount}回目`;
      };
    };
    const counter2 = createCounter2();
    console.log(counter2()); // => "1回目"
    console.log(counter2()); // => "2回目"

    /* 高階関数を使用することで条件の違う別の関数を定義できる */
    function greaterThan(n) {
      return function(m) {
        return m > n;
      };
    }
    // 5より大きな値かを判定する関数を作成する
    const greaterThan5 = greaterThan(5);
    console.log(greaterThan5(4)); // => false
    console.log(greaterThan5(5)); // => false
    console.log(greaterThan5(6)); // => true