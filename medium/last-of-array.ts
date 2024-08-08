import type { Equal, Expect } from '@type-challenges/utils'

type Last<T extends Array<any>> = T extends [T[0]] ? T[0] : (
  T extends [T[0], ...infer U] ? Last<U> : never
); 

// type Last<T extends any[]> = [any, ...T][T["length"]];

type a = Last<[2]>;

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]