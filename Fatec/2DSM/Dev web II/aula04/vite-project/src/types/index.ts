export interface ContextProps {
  users: User[];
  add: (user: User) => void;
  remove: (index: number) => void;
}

export interface User {
  name: string;
  age: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
