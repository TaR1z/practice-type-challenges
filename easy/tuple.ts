const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const


type TupleToObject<T extends readonly (keyof any)[]> = {
  [P in T[number]]: P;
};

// keyof any => string | symbol | number
type Temp = keyof any;

type result = TupleToObject<typeof tuple> 

export { };