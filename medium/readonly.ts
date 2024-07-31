interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyReadonly2<T extends { [key: string]: any }, U extends keyof T> = {
  [P in keyof T as P extends U ? never : P]: T[P];
} & {
  readonly [P in keyof T as P extends U ? U : never]: T[P];
};


const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

// todo.title = "Hello" // Error: cannot reassign a readonly property
// todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true; // OK

export {};
