import countriesJson from "@/constants/countries.json";
import isEmpty from "is-empty";
import { connectToDatabase } from "@/lib/database/index";
import { ICountry, IUser } from "@/types";
import { ironOptions } from "@/lib/session";
import { ResponseError } from "@/types";
import { User } from "@/lib/database/models/User";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function registerRoute(req, res) {
  if (req.method === "POST") {
    let { username, email, password, city, country } = req.body;
    let error: ResponseError = {
      message: "",
    };

    if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
      error.message = "Oups, une erreur est survenue.";
      return res.status(400).json(error);
    }

    connectToDatabase();

    /* Check country validity */
    if (
      !isEmpty(country) &&
      (country as ICountry).code &&
      !isEmpty((country as ICountry).code)
    ) {
      if (countriesJson.find((x) => x.code === (country as ICountry).code)) {
        country = countriesJson.find(
          (x) => x.code === (country as ICountry).code
        );
      }
    } else {
      error.message = "Oups, une erreur est survenue.";
      return res.status(400).json(error);
    }

    /* Check if the username is already taken */
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      error.message = "Ce nom d'utilisateur est déjà associé à un compte.";
      return res.status(400).json(error);
    }

    /* Checking if the email is already taken. */
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      error.message = "Cette adresse e-mail est déjà associé à un compte.";
      return res.status(400).json(error);
    }

    const user: IUser = {
      username,
      email,
      password,
      country,
      city,
      birthdate: new Date(),
      spokenLanguages: ["FR"],
      isVerified: false,
      createdAt: new Date(),
    };

    try {
      const newUser = new User(user);
      const saved = await newUser.save();
      req.session.user = saved;
      await req.session.save();
      return res.status(200).json(saved);
    } catch (err) {
      error.message = `Oups, une erreur est survenue. - ${JSON.stringify(err)}`;
      return res.status(500).json(error);
    }
  }
}, ironOptions);
