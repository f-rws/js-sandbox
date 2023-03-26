"use strict";

// Math

/*
    Mathオブジェクト
    ・ビルドインオブジェクトであるが、コンストラクタでない。そのため、インスタンスは生成せず、定数や`Math`オブジェクトのプロパティや関数を提供する。  */
const radius = 30;
const circleArea = radius * radius * Math.PI; // `Math.PI`は円周率
console.log(circleArea) // 2827.4333882308138