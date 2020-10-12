import React from "react";
import { PersonType } from "../types/APITypes";

export default function TableRow({ name, picture, email }: PersonType) {
  return (
    <tr>
      <td className="border">
        <img
          className="rounded-full mx-auto p-3"
          src={picture.thumbnail}
          alt={name.first}
        />
      </td>
      <td className="border p-3">
        <span>
          {name.first} {name.last}
        </span>
      </td>
      <td className="border p-3">{email}</td>
    </tr>
  );
}
