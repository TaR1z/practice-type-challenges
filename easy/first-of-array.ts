type arr1 = ['a', 'b', 'c'];

type arr2 = [3, 2, 1];

type arr3 = [];

// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
type First<T extends any[]> = T extends [infer A, ...infer _rest] ? A : never;

  
type head1 = First<arr1> 
type head2 = First<arr2>
type head3 = First<arr3>

export { };