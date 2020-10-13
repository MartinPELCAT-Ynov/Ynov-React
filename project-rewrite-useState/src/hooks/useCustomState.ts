import { useReducer } from "react";

const reducer = (state: any, value: Function | any) => {
  if (typeof value === "function") {
    return value(state);
  }
  return value;
};

export function useCustomState<T>(
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const setState = (value: T | ((val: T) => T)) => {
    dispatch(value);
  };
  return [state, setState];
}
