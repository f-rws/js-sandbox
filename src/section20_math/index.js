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