"use strict";

// クラス

/*  クラスのプロトタイプメソッドの定義
    ・クラスでは初期化時に呼ばれる特殊な`constructor`メソッドとは別にメソッドを定義できる。
    ・クラスで定義されたメソッドはインスタンス間で共有される。インスタンス間で共有されるメソッドを"プロトタイプメソッド"と呼ぶ。  */
class Counter {
    constructor() {
        this.count = 0;
    }
    increment() {
        this.count++;
    }
}
const counterA = new Counter();
const counterB = new Counter();
// `class`が同じであればインスタンスは違えど、プロトタイプメソッドの参照先は同じである
console.log(counterA.increment === counterB.increment) // true


/*  クラスのアクセッサプロパティの定義
    ・クラスにはプロパティの参照（getter）と代入（setter）を行える特殊なメソッドが存在する。この特殊なメソッドはプロパティのように扱えることから"アクセッサプロパティ"と呼ばれる。
    ・`getter` -> 返り値が必要。
    ・`setter` -> 引数から値を受け取れる。値を返す必要はない。  */
class Arsenal {
    constructor(name) {
        this.name = name;
    }
    get fW() {
        console.log("getter")
        return this.name;
    }
    set fW(newValue) {
        console.log("setter")
        this.name = newValue;
    }
}
const arsenal = new Arsenal("ジェズス");
console.log(arsenal.fW);  // getter
arsenal.fW = "エンケティア" // setter
console.log(arsenal.fW);  // getter


/*
    Publicクラスフィールド
    ・クラスのインスタンスで使用するプロパティをわかりやすく宣言的にするためにクラスフィールド構文が追加された。`constructor`メソッドの中で定義しなくてよくなった。
    ・処理の順番としてはクラスフィールドの初期化処理後に`constructor`メソッドが実行される。  */
class Counter2 {
    count = 0;
    increment() {
        console.log("this", this)

        this.count++
    }
}
const counter2 = new Counter2();
console.log("increment前", counter2.count); // 0
counter2.increment()
console.log("increment後", counter2.count); // 1

class TestClass {
    publicField = 1;
    constructor(arg) {
        console.log("this", this)

        this.publicField = arg;
    }
}
const testClass = new TestClass(3);
console.log("testClass", testClass.publicField) // 3
    /*
        クラスフィールドでの`this`はクラスのインスタンスを示す
        ・クラスフィールドでは任意の式が定義でき、`this`も利用できる。クラスフィールドでの`this`はクラスインスタンスを参照する
        ・ArrowFunctionと組み合わせることもできる  */
    class Counter3 {
        count = 0;
        // incrementメソッドを参照している
        up = this.increment;
        increment() {
            this.count++
        }
    }
    const counter3 = new Counter3();
    counter3.up();
    console.log("counter3", counter3.count); // 1

    class Counter4 {
        count = 0;
        up = () => {
            this.increment();
        }
        increment() {
            this.count++
        }
    }
    const counter4 = new Counter4();
    // インスタンス生成時に`this`の参照先が（クラスのインスタンスに）固定されている。
    const up = counter4.up;
    up();
    console.log("counter4", counter4.count); // 1






































