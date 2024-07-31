interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyPick<T, U extends keyof T> = {
  [key in U]: T[U]
};

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
};

export { };