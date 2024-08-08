/**
 * 协变（Covariant）：只在同一个方向；
 * 逆变（Contravariant）：只在相反的方向；
 * 双向协变（Bivariant）：包括同一个方向和不同方向；
 * 不变（Invariant）：如果类型不完全相同，则它们是不兼容的
 */

// 协变（Covariant）：返回类型必须包含足够的数据。

// 返回类型
// interface Point2D {
//   x: number;
//   y: number;
// }
// interface Point3D {
//   x: number;
//   y: number;
//   z: number;
// }

// let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
// let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

// iMakePoint2D = iMakePoint3D;
//  iMakePoint3D 是 iMakePoint2D 子类
// ERROR: Point2D 不能赋值给 Point3D
//  iMakePoint3D = iMakePoint2D;

// 参数数量
// 更少的参数数量是好的（如：函数能够选择性的忽略一些多余的参数），但是你得保证有足够的参数被使用了：
// const iTakeSomethingAndPassItAnErr = (x: (err: Error, data: any) => void) => {
//   /* 做一些其他的 */
// };

// iTakeSomethingAndPassItAnErr(() => null); // ok
// iTakeSomethingAndPassItAnErr(err => null); // ok
// iTakeSomethingAndPassItAnErr((err, data) => null); // ok

// Error: 参数类型 `(err: any, data: any, more: any) => null` 不能赋值给参数类型 `(err: Error, data: any) => void`
// iTakeSomethingAndPassItAnErr((err, data, more) => null);

// 可选的和 rest 参数
// 可选的（预先确定的）和 Rest 参数（任何数量的参数）都是兼容的：
// let foo = (x: number, y: number) => {};
// let bar = (x?: number, y?: number) => {};
// let bas = (...args: number[]) => {};

// foo = bar;
// bar = foo;
// foo = bas;


// 函数参数类型
// 双向协变（Bivariant）：旨在支持常见的事件处理方案。
// 事件等级
// interface Event {
//   timestamp: number;
// }
// interface MouseEvent extends Event {
//   x: number;
//   y: number;
// }
// interface KeyEvent extends Event {
//   keyCode: number;
// }

// // 简单的事件监听
// enum EventType {
//   Mouse,
//   Keyboard
// }

// function addEventListener(eventType: EventType, handler: (n: Event) => void) {
//   // ...
// }

// 不安全，但是有用，常见。函数参数的比较是双向协变。
// addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// 在安全情景下的一种不好方案
// addEventListener(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
// addEventListener(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// 仍然不允许明确的错误，对完全不兼容的类型会强制检查
// addEventListener(EventType.Mouse, (e: number) => console.log(e));


// interface Point2D {
//   x: number;
//   y: number;
// }
// interface Point3D {
//   x: number;
//   y: number;
//   z: number;
// }

// let iTakePoint2D = (point: Point2D) => {};
// let iTakePoint3D = (point: Point3D) => {};

// ok, 这是合理的
// iTakePoint3D = iTakePoint2D;  
// ok，为什么？
// iTakePoint2D = iTakePoint3D;  

// A <= B 意味着 A 是 B 的子类型
// A -> B 指的是以 A 为参数类型， 以 B 为返回值类型的函数类型
// x ： A 意味着 x 的类型为 A


// Greyhound ≼ Dog ≼ Animal

// interface Animal {
//   name: string;
// }

// interface Dog extends Animal {
//   tall: string;
// }

// interface GreyHound extends Dog {
//   color: string;
// }

// let tempAnimal: Animal = { name: "" };
// let tempDog: Dog = { name: "", tall: "", };
// let tempGreyHound: GreyHound = { name: "", tall: "", color: "", };


// tempAnimal = tempGreyHound;
// tempDog = tempGreyHound;

// f: (Dog -> Dog) -> String;

// (Animal -> GreyHound) <= (Dog -> Dog)

// 函数类型 参数类型是逆变的。返回值类型是协变的

// 用合适的术语来描述这个奇怪的表现，可以说我们允许一个函数类型中，返回值类型是协变的，而参数类型是逆变的。
// Animal -> Dog
// 参数类型是逆变的，意思是 A ≼ B 就意味着(B → T) ≼ (A → T) （ A 和 B 的位置颠倒过来了）。
// 返回值类型是协变的，意思是 A ≼ B 就意味着(T → A) ≼ (T → B) 。

// 在 TypeScript 中，参数类型是双向协变的，也就是说既是协变又是逆变的，而这并不安全。
// 但是现在你可以在 TypeScript 2.6 版本中通过--strictFunctionTypes 或--strict 标记来修复这个问题。

// function tempFunc(func: (dog: Dog) => Dog) { };

// const params = (tempAnimal: Animal): GreyHound => tempGreyHound;

// tempFunc(params);


// 问题：以下哪种类型是 Dog → Dog 的子类型呢？

// Greyhound → Greyhound
// Greyhound → Animal
// Animal → Animal
// Animal → Greyhound
// 让我们来思考一下如何解答这个问题。
// 首先我们假设 f 是一个以 Dog → Dog 为参数的函数。
// 它的返回值并不重要，
// 为了具体描述问题，我们假设函数结构体是这样的： f: (Dog → Dog) → String。

// 现在我想给函数 f 传入某个函数 g 来调用。我们来瞧瞧当 g 为以上四种类型时，会发生什么情况。

// 1. 我们假设 g : Greyhound → Greyhound， f(g) 的类型是否安全？

// 不安全，因为在f内调用它的参数(g)函数时，使用的参数可能是一个不同于灰狗但又是狗的子类型，例如 GermanShepherd （牧羊犬）。

// 2. 我们假设 g : Greyhound → Animal， f(g) 的类型是否安全？

// 不安全。理由同(1)。

// 3. 我们假设 g : Animal → Animal， f(g) 的类型是否安全？

// 不安全。因为 f 有可能在调用完参数之后，让返回值，也就是 Animal （动物）狗叫。并非所有动物都会狗叫。

// 4. 我们假设 g : Animal → Greyhound， f(g) 的类型是否安全？

// 是的，它的类型是安全的。首先，f 可能会以任何狗的品种来作为参数调用，而所有的狗都是动物。其次，它可能会假设结果是一条狗，而所有的灰狗都是狗。


// 问题：List<Dog> 能否为 List<Animal> 的子类型？

// 答案有点微妙。
// 如果列表是不可变的（immutable），那么答案是肯定的，因为类型很安全。但是假如列表是可变的，那么答案绝对是否定的！

// 原因是，假设我需要一串 List<Animal> 而你传给我一串 List<Dog>。
// 由于我认为我拥有的是一串 List<Animal> ，我可能会尝试往列表插入一只 Cat。
// 那么你的 List < Dog > 里面就会有一只猫！类型系统不应该允许这种情况发生。

// 总结一下，我们可以允许不变的列表（immutable）在它的参数类型上是协变的，
// 但是对于可变的列表（mutable），其参数类型则必须是不变的（invariant），既不是协变也不是逆变。

// function checkIfAnimalsAreAwake(arr: Animal[]) {  }

// let myPets: Dog[] = [];

// Error? Can't substitute Dog[] for Animal[]?
// checkIfAnimalsAreAwake(myPets);

// const a: Foo = {
//   x: 1,
//   y: "1",
//   temp: {}
// };

// type Index = 'a' | 'b' | 'c';
// type FromIndex = { [k in Index]?: number };

// const good: FromIndex = { b: 1, c: 2 };

// Error:
// `{ b: 1, c: 2, d: 3 }` 不能分配给 'FromIndex'
// 对象字面量只能指定已知类型，'d' 不存在 'FromIndex' 类型上
// const bad: FromIndex = { b: 1, c: 2, d: 3 };

// type FieldState = {
//   value: string;
// };

// type FromState = {
  // isValid: boolean; // Error: 不符合索引签名
//   [filedName: string]: string;
// };

// namespace importing {
//   export class Foo {
//     name: string;
//   }
// }

// import Bar = importing.Foo;
// let bar: Bar; // ok

// class Foo {
//   foo: number; // 我们想要捕获的类型
// }

// declare let _foo: Foo;

// // 与之前做法相同
// let bar: typeof _foo.foo;

// const colors = {
//   red: 'red',
//   blue: 'blue'
// };

// type a = typeof colors;
// type b = keyof a;

// type ObjectDescriptor<D, M> = {
//   data?: D;
//   methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
// };

// function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
//   let data: object = desc.data || {};
//   let methods: object = desc.methods || {};
//   return { ...data, ...methods } as D & M;
// }

// let obj = makeObject({
//   data: { x: 0, y: 0 },
//   methods: {
//     moveBy(dx: number, dy: number) {
//       this.x += dx; // Strongly typed this
//       this.y += dy; // Strongly typed this
//     }
//   }
// });

// obj.x = 10;
// obj.y = 20;
// obj.moveBy(5, 5);

class Temp {
  a: 1;
}

class A {
  constructor(public readonly otherService: Temp) {
    
  }
}

export { };