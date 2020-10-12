import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIResult, GenderType } from "./types/APITypes";
import TableRow from "./components/TableRow";

export default function App() {
  const [datas, setDatas] = useState<APIResult>([]);
  const [searchValue, setSearchValue] = useState("");
  const [genderToDisplay, setGenderToDisplay] = useState<GenderType[]>([
    "female",
    "male",
  ]);
  useEffect(() => {
    const start = async () => {
      try {
        const { data } = await axios("https://randomuser.me/api/?results=20", {
          headers: { "Access-Control-Allow-Origin": "*" },
        });

        setDatas(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    start();
  }, []);

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const toggleGender = (gender: GenderType) => {
    console.log(genderToDisplay);

    if (genderToDisplay.includes(gender)) {
      setGenderToDisplay([...genderToDisplay.filter((gen) => gen !== gender)]);
    } else {
      setGenderToDisplay([...genderToDisplay, gender]);
    }
  };

  return (
    <div>
      <div className="w-full">
        <input
          className="text-2xl h-16 w-full px-4  outline-none"
          placeholder="Search person"
          onChange={handleSearchChange}
          value={searchValue}
        />
      </div>
      <div className="w-full flex text-lg">
        <div className="w-1/2 space-x-3 p-3">
          <label htmlFor="female">Female</label>
          <input
            id="female"
            type="checkbox"
            checked={genderToDisplay.includes("female")}
            onChange={() => toggleGender("female")}
          />
        </div>
        <div className="w-1/2 space-x-3 p-3">
          <label htmlFor="male">Male</label>
          <input
            id="male"
            type="checkbox"
            checked={genderToDisplay.includes("male")}
            onChange={() => toggleGender("male")}
          />
        </div>
      </div>
      <div className="">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-3 py-3">
                <span>Avatar</span>
              </th>
              <th className="px-3 py-3">
                <span>Name</span>
              </th>
              <th className="px-3 py-3">
                <span>Email</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {datas
              .filter((prs) => {
                return (
                  (prs.email.includes(searchValue) ||
                    prs.name.first.includes(searchValue) ||
                    prs.name.last.includes(searchValue)) &&
                  genderToDisplay.includes(prs.gender)
                );
              })
              .map((person) => {
                return <TableRow key={person.email} {...person} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
