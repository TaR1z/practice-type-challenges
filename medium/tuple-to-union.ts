type Arr = ['1', '2', '3']

type TupleToUnion<T> = T extends Array<infer U> ? U : never;
// type TupleToUnion<T extends Array<any>> = T[number];

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]