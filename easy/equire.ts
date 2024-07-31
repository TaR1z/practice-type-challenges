/**
 * 1. 分布式条件类型的规避
 * 2. 创建 “类型指纹”
 * 3. 延迟评估
 * 4. 利用函数类型的协变性
 * 5. 全面比较
 * 6. 避免直接比较局限性
 * 7. 处理复杂类型
 */

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

// 分布式条件类型的规避
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>;
// 规避
type NoDistribute<T> = [T] extends [any] ? T[] : never;
type Result1 = NoDistribute<string | number>;

type A = string | number;
type B = number | string;
type Distribute<T, U> = T extends U ? true : false;
type AreEqualDistributed = Distribute<A, B>;

// 延迟评估
type Immediate<T> = T extends number ? "number" : "not number";
type Result2 = Immediate<number>; // "number"
type Result3 = Immediate<string>; // "not number"

type Deferred<T> = () => T extends number ? "number" : "not number";

type Result4 = Deferred<number>; // () => "number"
type Result5 = Deferred<string>; // () => "not number"

// 这会导致错误：类型别名循环引用自身
// type Recursive<T> = T extends [infer First, ...infer Rest]
//   ? [Recursive<First>, ...Recursive<Rest>]
//   : T;
// type Recursive<T> = T extends [infer First, ...infer Rest]
//     ? [() => Recursive<First>, ...Recursive<Rest>]
//     : T;

// type NestedArray = [1, [2, [3, 4]], 5];
// type RecursiveResult = Recursive<NestedArray>;
// 这会导致错误：类型别名循环引用自身

// 协变性
class Animal {}
class Dog extends Animal {}

type AnimalGetter = () => Animal;
type DogGetter = () => Dog;

let animalFunc: AnimalGetter = () => new Animal();
let dogFunc: DogGetter = () => new Dog();

animalFunc = dogFunc;


// 复制
type T1 = { x: number };
type T2 = { x: number; y: string };

export {};
