export interface IUser {
  username: string;
  email: string;
  password: string;
  country: ICountry;
  city: string;
  birthdate: Date;
  spokenLanguages: string[];
  isVerified: boolean;
  createdAt: Date;
}

export interface IUserMethods {
  comparePassword : (
    password: string,
    callback: (err: any, isMatch: boolean) => void
  ) => boolean;
}

export interface ICountry {
  code: string;
  name: string;
}

export type ResponseError = {
  message: string;
};

export type ControlVariant = "primary" | "success" | "error";

export type SelectCountryOption = {
  label: string;
  value: string;
  plainObject: ICountry;
};
