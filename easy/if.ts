type If<T extends boolean, U, G> = T extends true ? U : G;

type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'

export { };