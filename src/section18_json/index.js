"use strict";

// JSON

/*
    オブジェクトをJSON文字列に変換する
    ・`JSON.stringify`メソッドにはオプショナルな第二引数として関数、または配列を渡せる。
    　・関数の場合、文字列に変換する際に処理を通せる。関数の引数にキーと値が渡される。
    　・配列の場合、プロパティの許可リストとして扱われ流。配列の要素とキーを比較し一致するプロパティのみ文字列に変換する。  */
// 関数
const obj1 = {name: "ジェズス", number: 9, test: null};
const replacer1 = (key, value) => {
    if(value === null) {
        return undefined;
    }
    return value;
};
const strObj1 = JSON.stringify(obj1, replacer1);
console.log(strObj1); // '{"name":"ジェズス","number":9}'
// 配列
const obj2 = {name: "ジェズス", number: 9, test: null};
const replacer2 = ["name", "test"];
const strObj2 = JSON.stringify(obj2, replacer2);
console.log(strObj2); // '{"name":"ジェズス","test":null}'