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

    /*
        マップとしてのObjectとMap
        ・`Object`の場合
        　・`prototype`から継承されたプロパティ名によって意図しないマッピングを生じる危険性がある（`constructor`など）。
        　　ただし、`prototype`を継承しない`Object.create(null)`を使用して解消可能。
          ・キー名に使えるのは`string`と`Symbol`のみ
        ・`Map`の利点
        　・マップのサイズが簡単にわかる
        　・マップが持つ要素を簡単に列挙できる
        　・オブジェクトをキーにすると参照ごとに違うマッピングができる   */
    // ショッピングカートを表現するクラス
    class ShoppingCart {
        constructor() {
            // 商品とその数を持つマップ
            this.items = new Map();
        }
        // カートに商品を追加する
        addItem(item) {
            // `item`がない場合は`undefined`を返すため、Nullish coalescing演算子(`??`)を使いデフォルト値として`0`を設定する
            const count = this.items.get(item) ?? 0;
            this.items.set(item, count + 1);
            console.log(this.items)
        }
        // カート内の合計金額を返す
        getTotalPrice() {
            return Array.from(this.items).reduce((total, [item, count]) => {
                return total + item.price * count;
            }, 0);
        }
        // カートの中身を文字列にして返す
        toString() {
            return Array.from(this.items).map(([item, count]) => {
                return `${item.name}:${count}`;
            }).join(",");
        }
    }
    const shoppingCart = new ShoppingCart();
    // 商品一覧
    const shopItems = [
        { name: "みかん", price: 100 },
        { name: "リンゴ", price: 200 },
    ];

    shoppingCart.addItem(shopItems[0]);
    shoppingCart.addItem(shopItems[0]);
    shoppingCart.addItem(shopItems[1]);
    console.log(shoppingCart.getTotalPrice()) // 400
    console.log(shoppingCart.toString()) // "みかん:2,リンゴ:1"

    /*
        キーの等価性とNaN
        ・マップがキーを既に持っているかは基本的に`===`演算子を使用する。
        ・例外として`NaN`のみは常に`true`と判定される。この挙動はSame-value-zeroアルゴリズムと呼ばれる。  */
    // `NaN`同士の厳密等価は`false`になる
    console.log(NaN === NaN) // false
    const map7 = new Map();
    map7.set(NaN, "value");
    // マップでの比較では等しく判定される
    console.log(map7.has(NaN)); // true
    // 追加しようとしても等しいものと判定され、sizeは増えない
    map7.set(NaN, "value");
    console.log(map7.size); // 1

    // キーが`object`の場合、常に不等価のため新たにセットされる
    const map8 = new Map();
    const obj1 = {key: "value"};
    const obj2 = {key: "value"};
    console.log(obj1 === obj2); // false
    map8.set(obj1, "value");
    map8.set(obj2, "value");
    console.log("map8", map8.size); // "map8" 2
    // キーが`JSON.stringify(object)`の場合、プリミティブな文字列に変換し等価として判定されるため新たにセットされることはない。
    const map9 = new Map();
    const strObj1 = JSON.stringify({key: "value"});
    const strObj2 = JSON.stringify({key: "value"});
    console.log(strObj1 === strObj2); // true
    map9.set(strObj1, "value");
    map9.set(strObj2, "value");
    console.log("map9", map9.size); // "map9" 1
