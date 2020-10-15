import { useReducer, useState } from "react";

const reducer = (state: StateType, action: ActionType): StateType => {
  console.log(action);
  switch (action.type) {
    case "set":
      return {
        ...state,
        present: action.value,
        past: [...state.past, state.present],
      };
    case "redo":
      return {
        future: [...state.future.slice(0, state.future.length - 1)],
        present: state.future[state.future.length - 1],
        past: [...state.past, state.present],
      };
    case "undo":
      return {
        future: [...state.future, state.present],
        present: state.past[state.past.length - 1],
        past: [...state.past.slice(0, state.past.length - 1)],
      };
    case "reset":
      return initState;
  }
};

type ActionType =
  | { type: "set"; value: any }
  | {
      type: "reset" | "undo" | "redo";
    };

type StateType = {
  present: string;
  past: string[];
  future: string[];
};

const initState: StateType = {
  present: "",
  past: [],
  future: [],
};

export const useUndo = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const past = state.past;
  const present = state.present;
  const future = state.future;

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;
  const set = (value: any) => dispatch({ type: "set", value });
  const reset = () => dispatch({ type: "reset" });
  const undo = () => canUndo && dispatch({ type: "undo" });
  const redo = () => canRedo && dispatch({ type: "redo" });

  return { past, present, future, set, reset, undo, redo, canUndo, canRedo };
};

export const useUndoState = () => {
  const [state, setState] = useState<StateType>(initState);

  const past = state.past;
  const present = state.present;
  const future = state.future;

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;
  const set = (value: any) =>
    setState((newState) => ({
      ...newState,
      present: value,
      past: [...newState.past, newState.present],
    }));

  const reset = () => setState(initState);

  const undo = () =>
    canUndo &&
    setState((newState) => ({
      future: [...newState.future, newState.present],
      present: newState.past[newState.past.length - 1],
      past: [...newState.past.slice(0, newState.past.length - 1)],
    }));
  const redo = () =>
    canRedo &&
    setState((newState) => ({
      future: [...newState.future.slice(0, newState.future.length - 1)],
      present: newState.future[newState.future.length - 1],
      past: [...newState.past, newState.present],
    }));

  return { past, present, future, set, reset, undo, redo, canUndo, canRedo };
};
