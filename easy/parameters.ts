const foo = (arg1: string, arg2: number): void => { }

type MyParameters<T extends (...args) => unknown> = T extends ((...rest: infer S) => void) ? S : unknown;

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]

export { };