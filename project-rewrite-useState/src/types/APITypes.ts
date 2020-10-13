export type PersonType = {
  name: { first: string; last: string };
  picture: { thumbnail: string };
  email: string;
  gender: GenderType;
};

export type GenderType = "male" | "female";
export type APIResult = Array<PersonType>;
