"use strict";

// Map/Set

/*
    Map
    ・キーと値の組み合わせからなる抽象データ型。例 => `[key, value]`  */
const map1 = new Map([["key1", "value1"], ["key2", "value2"]]);
console.log(map1.size) // 2
    /*
        要素の追加と取り出し
        ・`set`メソッドで要素を追加する
        ・`get`メソッドで特定のキーに紐づいた値を取得する
        ・`has`メソッドで特定のキーに紐づいた値を持っているかを確認できる
        ・`delete`メソッドでキーに紐づく要素を削除する
        ・`clear`メソッドで map が持つ全ての要素を削除する   */
    const map2 = new Map();
    map2.set("keyMap2", "valueMap2");
    console.log(map2.get("keyMap2")); // "valueMap2"
    console.log(map2.size); // 1
    // 要素を上書き
    map2.set("keyMap2", "valueMap2000");
    console.log(map2.get("keyMap2")); // "valueMap2000"
    // キーの存在確認
    console.log(map2.has("keyMap2")); // true
    // 要素を2つ追加
    map2.set("keyMap3", "valueMap3");
    map2.set("keyMap4", "valueMap4");
    console.log(map2.size); // 3
    // "keyMap4"を削除
    map2.delete("keyMap4");
    console.log(map2.size); // 2
    // 要素を全て削除
    map2.clear();
    console.log(map2.size); // 0