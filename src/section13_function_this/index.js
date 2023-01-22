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

/*
* 関数とメソッドにおける this
* ・関数には`function`キーワードを用いた関数宣言と関数式、ArrowFunctionなどがある。
* ・関数における`this`は ArrowFunction とそれ以外の関数定義で異なる。
* */

    // 関数の種類
        function fn1() {} // `function`キーワードを用いた関数宣言
        const fn2 = function() {}; // `function`キーワードを用いた関数式
        const fn3 = () => {}; // ArrowFunction を用いた関数式
    // メソッドの種類
        const obj = {
            method1: function() {}, // `function`キーワードを使ったメソッド
            method() {}, // 短縮系のメソッド
            method2: () => {} // ArrowFunction を用いたメソッド
        }

    /*
    * ArrowFunction 以外の関数における`this`
    * ・ArrowFunction 以外の関数の`this`は実行時に決まる値となる。イメージとしては関数に暗黙的に渡される引数のようなモノ。
    * ・関数における`this`の基本となる参照先はペースオブジェクトになる。
    * 　・ベースオブジェクトとはメソッドを呼ぶ際の呼ぶ際の`.`（ドット）または`[]`（ブラケット）の１つ左にあるオブジェクトのことである。
    * 　　そのため、ベースオブジェクトが無い場合は`undefined`となる。 */

        /*
        * 関数宣言と関数式における`this`
        * ・ベースオブジェクトが存在しないため`undefined`を返す
        * ・"use strict"を宣言していない場合、`this`はグローバルオブジェクトを参照してしまう。これは strict mode でない状況で`this`が`undefined`の場合は
        * 　グローバルオブジェクトを参照してしまうから  */
            function fn4() {console.log("fn4", this)}
            const fn5 = function() {console.log("fn5", this)};
            fn4(); // undefined
            fn5(); // undefined

        /*
        * メソッドの呼び出しにおける`this`
        * ・ベースオブジェクトを参照する  */
            const obj2 = {
                method1: function() {console.log("obj2.method1", this)},
                method() {console.log("obj2.method", this)},
            };
            obj2.method1() // obj2
            obj2.method() // obj2

            // 具体的な使用の仕方
            const team = {
                name: "arsenal",
                sayName() {
                    return `チーム名は\u0020${this.name}\u0020です。`;
                }
            };
            console.log(team.sayName()) // "チーム名は arsenal です。"

        /*
        * `this`が問題となるパターン
        * 関数における`this`は実行時に値が決まるという性質からいくつかの問題が出てくる。
        * ・問題１: `this`を含むメソッドを変数に代入した場合
        * ・問題２: コールバック関数と`this`  */
            /*
            * 問題１: `this`を含むメソッドを変数に代入した場合
            * ・以下の例では変数`sayName`にはただの`sayName()`メソッドが代入されたためベースオブジェクトが存在しなくなる。結果として`undefined.name`が呼び出されエラーとなっている。
            * ・対処法は以下の２つがある
            * 　・`obj.method()`として呼び出す。
            * 　・`this`の値を明示的に指定可能な`Function`のメソッド（call, apply, bind）を用いる。
            *  */
                const profile = {
                    name: "アルテタ",
                    sayName() {
                        return `私の名前は${this.name}です。`
                    }
                };
                console.log(profile.sayName()) // "私の名前はアルテタです。"
                // メソッドを変数へ代入
                const sayName = profile.sayName;
                // console.log(sayName()) // index.js:91 Uncaught TypeError: Cannot read properties of undefined (reading 'name')

                /*
                * 対処法：`this`の値を明示的に指定可能な`Function`のメソッド（call, apply, bind）を用いる。 */
                    // callメソッド：
                    //  fn.call(thisの値, ...fn の引数)
                    function greeting1(message) {
                        return `${message}${this.name}`
                    }
                    const profile1 = {
                        name: "ラムズデール"
                    };
                    console.log(greeting1.call(profile1, "やあ、")); // "やあ、ラムズデール"

                    // applyメソッド：
                    //  fn.apply(thisの値, [fn の引数1, fn の引数2, ...])
                    function greeting2(message, message2) {
                      return `${message}${this.name}。${message2}`
                    }
                    const profile2 = {
                      name: "ラムズデール"
                    };
                    console.log(greeting2.apply(profile2, ["やあ、", "MOMおめでとう"])); // "やあ、ラムズデール。MOMおめでとう"

                    // bindメソッド：`this`の値を束縛（bind）し新しい関数を生成する。返り値が関数となる
                    //  fn.bind(thisの値, ...fn の引数1)
                    function greeting3(message) {
                        return `${message}${this.name}`
                    }
                    const profile3 = {
                        name: "ラムズデール"
                    };
                    const greetingProfile3 = greeting3.bind(profile3, "やあ、");
                    console.log(greetingProfile3()); // "やあ、ラムズデール"
            /*
            * 問題２: コールバック関数と`this`
            * ・コールバック関数の中で`this`を参照すると問題となる場合がある。具体的にはメソッドの中で`Array.map()`メソッドのコールバック関数を扱う場合などに起きる。
            * 　コールバック関数の`function(str) {}`にはベースオブジェクトは存在しないため`this`は`undefined`となる。
            * ・対処法は３つある
            * 　・`this`を一時変数に代入する
            * 　・メソッド（`Array.map`メソッドなど）によっては`this`を渡せるようになっているので利用する。
            * 　・ArrowFunction でコールバック関数を扱う。  */
                const Prefixer1 = {
                    prefix: "pre",
                    prefixArray(strings) {
                        return strings.map(function(str) {
                            // コールバック関数における`this`は`undefined`となる(strict mode)
                            return this.prefix + "-" + str;
                        });
                    }
                };
                // Prefixer1.prefixArray(["a", "b", "c"]); // Uncaught TypeError: Cannot read properties of undefined (reading 'prefix')

                /*
                * 対処法：`this`を一時変数に代入する  */
                    const Prefixer2 = {
                        prefix: "pre",
                        prefixArray(strings) {
                            const that = this; // `this`を変数に代入
                            console.log(that) // `Prefixer2`
                            return strings.map(function(str) {
                                return that.prefix + "-" + str;
                            });
                        }
                    };
                    const prefixerStrings2 = Prefixer2.prefixArray(["a", "b", "c"]);
                    console.log("prefixerStrings2", prefixerStrings2); // ['pre-a', 'pre-b', 'pre-c']
                /*
                * 対処法：メソッド（`Array.map`メソッドなど）によっては`this`を渡せるようになっているので利用する  */
                    const Prefixer3 = {
                        prefix: "pre",
                        prefixArray(strings) {
                            return strings.map(function(str) {
                                return this.prefix + "-" + str;
                            }, this); // `map`メソッドの第二引数に`this`を渡す
                        }
                    };
                    const prefixerStrings3 = Prefixer3.prefixArray(["a", "b", "c"]);
                    console.log("prefixerStrings3", prefixerStrings3); // ['pre-a', 'pre-b', 'pre-c']
                /*
                * 対処法：ArrowFunction でコールバック関数を扱う
                * ・ArrowFunction で定義したコールバック関数は常に１つ外側のスコープの`this`を参照する  */
                    const Prefixer4 = {
                        prefix: "pre",
                        prefixArray(strings) {
                            return strings.map((str) => {
                                // ArrowFunction 自体は`this`を持っていないため、外側の`prefixArray`メソッドが持つ`this`を参照する
                                return this.prefix + "-" + str;
                            });
                        }
                    };
                    const prefixerStrings4 = Prefixer4.prefixArray(["a", "b", "c"]);
                    console.log("prefixerStrings4", prefixerStrings4); // ['pre-a', 'pre-b', 'pre-c']
    /*
    * ArrowFunction と`this`
    * ・ArrowFunction での`this`は定義時にどの値を参照するか決まる。
    * ・ArrowFunction は`this`を暗黙的な引数として受け付けない。そのため、ArrowFunction 内で定義された`this`は外側の`this`を参照する。
    * 　これは変数のスコープチェーンと同じ仕組みで`this`が無かった場合は外側のスコープへ探索しに行く。
    * ・ユーザーは`this`という変数を定義できない。 */
        /*
        * メソッドとコールバック関数と ArrowFunction
        * ・ArrowFunction における`this`は呼び出し方に影響されないため、コールバック関数がどのように呼ばれるかを考えなくて良い。  */
            const Prefixer5 = {
                prefix: "pre",
                prefixArray(strings) {
                    return strings.map((str) => {
                        // ArrowFunction 自体は`this`を持っていないため、外側の`prefixArray`メソッドが持つ`this`を参照する
                        return this.prefix + "-" + str;
                    });
                }
            };
            const prefixerStrings5 = Prefixer5.prefixArray(["a", "b", "c"]);
            console.log("prefixerStrings5", prefixerStrings5); // ['pre-a', 'pre-b', 'pre-c']
        /*
        * ArrowFunction は`this`をbindできない
        * ・ArrowFunction で定義した関数で`call`, `apply`, `bind`を使用しても引数に指定した`this`は無視される。  */
            const arrowFn = () => {
                return this;
            };
            console.log("arrowFn()", arrowFn()) // Window{...}
            console.log("arrowFn.call('THIS'))", arrowFn.call("THIS")) // Window{...}