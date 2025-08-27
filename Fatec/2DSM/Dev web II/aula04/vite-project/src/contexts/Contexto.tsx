import { createContext, useState } from "react";
import type { ChildrenProps, ContextProps, User } from "../types";

export const UserContext = createContext<ContextProps | null>(null);

export function UserProvider({ children }: ChildrenProps) {
  const [users, setUsers] = useState<User[]>([]);
  
  function add(user: User) {
    setUsers((prev) => [...prev, user]);
  }

  function remove(index: number) {
    setUsers(users.filter((_, i) => i !== index));
  }

  return (
    <UserContext.Provider value={{ users, add, remove }}>
      {children}
    </UserContext.Provider>
  );
}

