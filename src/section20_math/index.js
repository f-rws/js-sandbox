"use strict";

// Math

/*
    Mathオブジェクト
    ・ビルドインオブジェクトであるが、コンストラクタでない。そのため、インスタンスは生成せず、定数や`Math`オブジェクトのプロパティや関数を提供する。  */
const radius = 30;
const circleArea = radius * radius * Math.PI; // `Math.PI`は円周率
console.log(circleArea) // 2827.4333882308138

/*
    乱数を生成する
    ・`Math.random`メソッドは0以上1未満の浮動小数点の疑似乱数を返す。 */
const nums1 = [1, 2, 3];
nums1.forEach(num => {
    console.log(Math.random() + num);
})
// 1.853245654756109
// 2.45365825826492
// 3.649202231548693

/*
    数値の大小を比較する
    ・`Math.min`は引数に渡された最小の数値を返す。
    ・`Math.max`は引数に渡された最大の数値を返す。  */
console.log(Math.min(1, 30, 15)); // 1
console.log(Math.max(1, 30, 15)); // 30
// スプレッド構文を用いることで配列も渡せる
const nums2 = [1, 50, 100, 150];
console.log(Math.min(...nums2)); // 1
console.log(Math.max(...nums2)); // 150

/*
    数値を整数にする
    ・`floor`メソッドは渡した数以下の整数を返す。床関数と呼ばれる。
    ・`ceil`メソッドは渡した数以上の整数を返す。天井関数と呼ばれる。
    ・`round`メソッドは渡した数を四捨五入する。
    ・`trunc`メソッドは渡した数の小数点を切り落とす。正の数の場合は`floor`メソッドと同じ挙動となり、負の数の場合、`ceil`メソッドと同じ挙動となる。  */
// 床関数
console.log(Math.floor(1.4)); // 1
console.log(Math.floor(-1.1)); // -2
// 天井関数
console.log(Math.ceil(1.4)); // 2
console.log(Math.ceil(-1.1)); // -1
// 四捨五入
console.log(Math.round(1.4)); // 1
console.log(Math.round(-1.1)); // -1
// 小数点を切り落とす
console.log(Math.trunc(1.8)); // 1
console.log(Math.trunc(-1.1)); // -1