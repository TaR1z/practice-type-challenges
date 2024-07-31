type ExampleType = Promise<string>;

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;

type Result = MyAwaited<ExampleType>; // string

export {};
