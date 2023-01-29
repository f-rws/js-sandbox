"use strict";

// クラス

/*  クラスのプロトタイプメソッドの定義
    ・クラスでは初期化時に呼ばれる特殊な`constructor`メソッドとは別にメソッドを定義できる。
    ・クラスで定義されたメソッドはインスタンス間で共有される。インスタンス間で共有されるメソッドを"プロトタイプメソッド"と呼ぶ。  */
class Counter {
    constructor() {
        this.count = 0;
    }
    inclement() {
        this.count++;
    }
}
const counterA = new Counter();
const counterB = new Counter();
// `class`が同じであればインスタンスは違えど、プロトタイプメソッドの参照先は同じである
console.log(counterA.inclement === counterB.inclement) // true


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

