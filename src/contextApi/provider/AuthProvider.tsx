import { AUTH } from "../context";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  PropsWithChildren,
} from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default AuthProvider;
