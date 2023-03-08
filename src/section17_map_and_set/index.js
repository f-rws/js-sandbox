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

    /*
        マップの反復処理
        ・要素を列挙するメソッドとして以下の4つが存在する
        　・forEach...マップへの挿入順に反復処理をする。`Array.forEach`と似ているが、インデックスの代わりにキーが渡される
        　・keys...キーを並べた Iterator を返す。Iterator は`for...of`や`Array.from`が使用できる。
        　・values...`keys`メソッドの key が value にわかった挙動。
        　・entries...エントリー（`[key, value]`の配列）の Iterator を返す。   */
    // forEach
    const map3 = new Map([["key1", "value1"], ["key2", "value2"]]);
    const result = [];
    map3.forEach((value, key) => {
        result.push(`${key}: ${value}`);
    });
    console.log(result) // `['key1: value1', 'key2: value2']`

    // keys
    const map4 = new Map([["key1", "value1"], ["key2", "value2"]]);
    const result1 = [];
    for(const key of map4.keys()) {
        result1.push(key);
    }
    console.log(result1); // ['key1', 'key2']
    // Array を生成
    const map4KeysArray = Array.from(map4.keys());
    console.log(map4KeysArray); // ['key1', 'key2']

    // entries
    const map5 = new Map([["key1", "value1"], ["key2", "value2"]]);
    const result2 = [];
    for(const [key, value] of map5.entries()) {
        result2.push(`${key}: ${value}`);
    }
    console.log(result2) // `['key1: value1', 'key2: value2']`

    // map 自身も Iterator を返す。要素はエントリーとなるため、`entries`メソッドを使用した場合と同じ挙動になる
    const map6 = new Map([["key1", "value1"], ["key2", "value2"]]);
    const result3 = [];
    for(const [key, value] of map6) {
        result3.push(`${key}: ${value}`);
    }
    console.log(result3) // `['key1: value1', 'key2: value2']`
