import { useContext, createContext } from "react";

export interface Context {
  user: User | null;
  initialized?: boolean;
  isPending: boolean;
  signin: (email: string, password: string) => Promise<void>; //! datatbase
  signout: () => Promise<void>;
  signup: (newUser: User) => Promise<void>;
}

export const initialState: Context = {
  user: null,
  initialized: false,
  isPending: true,
  signin: async () => {},
  signout: async () => {},
  signup: async () => {},
};

export const context = createContext<Context>(initialState);

export const use = () => useContext(context);
