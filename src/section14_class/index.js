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


/*
    Privateクラスフィールド
    ・クラスの外からアクセス不可な値を`#`も用いることで定義できる。
    ・クラスの外からアクセスしようとすると`SyntaxError`を吐く  */
class PrivateLoader {
    #loadedContent;
    load() {
        this.#loadedContent = "読み込んだコンテンツ内容";
    };
    display() {
        return this.#loadedContent;
    }
}
const privateLoader = new PrivateLoader();
privateLoader.load();
console.log(privateLoader.display()); // "読み込んだコンテンツ内容"
// console.log(privateLoader.#loadedContent); // Uncaught SyntaxError


/*
    静的メソッド
    ・インスタンス化せずに呼び出せるメソッド。`static`をつけて定義する
    ・静的メソッドでの`this`はクラスのインスタンスではなく、クラス自身を参照している。そのため、静的メソッドはクラスのインスタンスの作成処理やクラスに関係する処理を書くために利用される  */
class Members {
    constructor(members = []) {
        this.members = members;
    }
    static of(...members) {
        // return new Members(members);
        return new this(members); // `this`はクラスを参照しているためこちらの記述でも同じ結果を得られる
    };
    numberOfMembers() {
        return this.members.length;
    }
}
const membersA = new Members(["ジェズス", "ぶかよ", "サカ"]);
const membersB = Members.of("ジェズスA", "ぶかよA", "サカA");
console.log("membersA", membersA.numberOfMembers());  // 3
console.log("membersB", membersB.numberOfMembers());  // 3


/*
    静的クラスフィールド
    ・静的メソッドと同じようにインスタンス化せずに呼び出せるプロパティ。`static`をつけて定義する。
    ・Privateクラスフィールドと併用も可能  */
class Colors {
    static GREEN = "緑";
    static #BLACK = "黒";  // Privateクラスフィールドと併用
    static callBlack() {
        return this.#BLACK;
    }
}
console.log("Colors.GREEN", Colors.GREEN)  // "緑"
console.log("Colors.BLACK", Colors.BLACK)  // undefined
console.log("Colors.callBlack()", Colors.callBlack())  // "緑"


/*
    プロトタイプに定義したメソッドとインスタンスに定義したメソッドの違い
    ・プロトタイプメソッド（class構文のメソッド）の定義とクラスフィールドを使ったメソッド定義が存在する。
    　・プロトタイプメソッドは"プロトタイプオブジェクト"という特殊なオブジェクトに定義される。
    　・クラスフィールドを使ったメソッドはクラスのインスタンスに対してメソッドが定義される。
    ・どちらのメソッドも定義はされている。そして、クラスのインスタンスオブジェクトに定義されたメソッドが優先される。  */
class ConflictClass {
    // クラスのインスタンスオブジェクトに`method`を定義
    method = () => {
        console.log("クラスのインスタンスオブジェクトのメソッド");
    };

    // プロトタイプメソッドとして`method`を定義
    method() {
        console.log("プロトタイプのメソッド");
    }
}
const conflict = new ConflictClass();
conflict.method()  // "クラスのインスタンスオブジェクトのメソッド"
delete conflict.method
conflict.method()  // "プロトタイプのメソッド"
/*
     プロトタイプオブジェクト
     ・プロトタイプオブジェクトはJavaScriptの関数オブジェクトから継承されるオブジェクトである。クラスも関数オブジェクトであるため、`prototype`オブジェクトが作成されている。
     ・class構文のメソッドは`prototype`オブジェクトに定義される。また、`constructor`メソッドも`prototype`オブジェクトに定義されている。
      `constructor`プロパティはクラス自身を参照している。  */
class MyClass {
    method() {
        console.log("`prototype`オブジェクトに定義される")
    }
}
console.log(MyClass.prototype)  // {constructor: ƒ, method: ƒ}
console.log(MyClass.prototype.constructor)  // `class MyClass {...}`
/*
     プロトタイプチェーン
     ・クラスインスタンスからプロトタイプメソッドを呼び出せるのはプロトタイプチェーンの仕組みによるもの。プロトタイプチェーンは以下の２つの処理から成り立つ。
     　・インスタンス作成時に、インスタンスの`[[Prototype]]`内部のプロパティを保存する処理
     　・インスタンスからプロパティやメソッドを参照するときに、`[[Prototype]]`内まで探索する処理  */
    /*
        インスタンス作成とプロトタイプチェーン
        ・new 演算子によるインスタンス作成時、インスタンスにはクラスのプロトタイプオブジェクトが参照され、インスタンスの`[[Prototype]]`に保存される。
        ・インスタンスから`[[Prototype]]`を参照するには`Object.getPrototypeOf`メソッドを用いる。  */
    class MyClassA {
        originalMethod() {
            console.log("プロトタイプのメソッド");
        }
    }
    const myClassA = new MyClassA();
    const myClassAInstancePrototype = Object.getPrototypeOf(myClassA);
    console.log(myClassAInstancePrototype)  // {constructor: ƒ, originalMethod: ƒ}
    console.log(MyClassA.prototype)  // {constructor: ƒ, originalMethod: ƒ}
    console.log("クラスのプロトオブジェクトとインスタンスのプロトオブジェクトが等しいかどうか", myClassAInstancePrototype === MyClassA.prototype)  // true
    /*
         プロパティの参照とプロトタイプチェーン
         ・クラスインスタンスに定義されたプロパティとメソッドは以下の順序で探索される
            1. インスタンスオブジェクト自身
            2. インスタンスオブジェクトの`[[Prototype]]`内
            3. どこにも無い場合は`undefined`  */


































