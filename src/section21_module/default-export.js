"use struct";

const hoge = "hoge";
const fuga = "fuga";

export default  hoge ;
// 複数のデフォルトエクスポートを定義すると注意される。
// export default  fuga ; "A module cannot have multiple default exports"
export {fuga} ;