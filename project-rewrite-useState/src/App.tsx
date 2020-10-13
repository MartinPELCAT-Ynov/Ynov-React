import React from "react";
import { useUndo } from "./hooks/useUndo";

export default function App() {
  const { present, future, past, set, undo, redo } = useUndo();

  return (
    <div>
      {/* <div className="w-full bg-indigo-500 h-12 flex">
        <span className="m-auto">{count}</span>
      </div> */}
      <div className="w-full bg-indigo-500 h-12 flex p-2 space-x-4">
        <button
          className="border-pink-400 rounded-md px-4 border"
          onClick={undo}
        >
          undo
        </button>
        <button
          className="border-pink-400 rounded-md px-4 border"
          onClick={redo}
        >
          redo
        </button>
      </div>
      <div className="w-full">
        <textarea
          value={present}
          onChange={(e) => set(e.currentTarget.value)}
          rows={10}
          className="w-full text-xl"
          placeholder="Type your text"
        />
      </div>
      <div>Past: {JSON.stringify(past)}</div>
      <div>Present: {JSON.stringify(present)}</div>
      <div>Future: {JSON.stringify(future)}</div>
    </div>
  );
}
