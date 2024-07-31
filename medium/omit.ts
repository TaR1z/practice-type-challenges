interface Todo {
  title: string
  description: string
  completed: boolean
}


type MyOmit<T extends { [key: string]: any;  }, U extends keyof T> = {
  [P  in keyof T  as P extends U ? never : P]: T[P]; 
};

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

export { };