type Space = " " | "\n" | "\t";

// type Trim<T extends string> = T extends `${Space}${infer R}`
//   ? Trim<R>
//   : T extends `${infer R}${Space}`
//   ? Trim<R>
//   : T;

type Trim<T extends string> = T extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R> : T;

type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];

export {};
