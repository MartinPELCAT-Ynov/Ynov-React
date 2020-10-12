export type PersonType = {
  name: { first: string; last: string };
  picture: { thumbnail: string };
  email: string;
};

export type APIResult = Array<PersonType>;
