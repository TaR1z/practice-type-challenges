import type { Alike, Expect } from "@type-challenges/utils";

// Exclude 排除
type Exclude<T, U> = T extends U ? never : T;

// 挑选
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit 忽略
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// 1. 可以使用 T = {} 来作为默认值，甚至默认参数与默认返回值，再通过递归传递 T 即可实现递归全局记录
// 2. option 是一个函数接收两个值：K 和 V，为了约束 key 不可重复必须范型传入，value 是任意类型范型不做约束直接透传
// type Chainable<T = {}> = {
//   option: <K extends string, V>(key: K, value: V) => Chainable<T & Record<K, V>>
//   get: () => T
// }
// 3. 先验证重复 key，实现传入相同 key 报错
// type Chainable<T = {}> = {
//   option: <K extends string, V>(key: K extends keyof T ? never : K, value: V)
//     => Chainable<T & Record<K, V>>
//   get: () => T
// }
// 4. 然后发现案例3无法通过，案例3是传入了相同的 key 但类型不同，因此在 K extends keyof T 后面增加验证只有类型相同才返回 never
// type Chainable<T = {}> = {
//   option: <K extends string, V>(key: K extends keyof T ?
//     V extends T[K] ? never : K
//     : K, value: V) => Chainable<T & Record<K, V>>
//   get: () => T
// }
// 5. 最后直接 & 联合并不能将相同 key 的类型覆盖，因此用 Omit 去掉前一个类型中相同的 key
// type Chainable<T = {}> = {
//   option: <K extends string, V>(key: K extends keyof T ?
//     V extends T[K] ? never : K
//     : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
//   get: () => T
// }

type Chainable<T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? (V extends T[K] ? never : K) : K,
    value: V
  ) => Chainable<Omit<T, K> & Record<K, V>>;
  get: () => T;
};

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // .option("name", "last name")
  .get();

const result3 = a.option("name", "another name").option("name", 123).get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};
