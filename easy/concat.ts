type Tuple = readonly unknown[];

type Concat<T extends Tuple, U extends Tuple> = [...T, ...U];

type Result = Concat<[1], [2]>; // expected to be [1, 2]
