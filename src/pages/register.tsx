import axios, { AxiosError } from "axios";
import Button from "@/components/Layout/Controls/Button";
import countriesJson from "../constants/countries.json";
import Head from "next/head";
import InputText from "@/components/Layout/Controls/InputText";
import Link from "next/link";
import Router from "next/router";
import SelectCountry from "@/components/Layout/Controls/SelectCountry";
import toast from "react-hot-toast";
import useTranslation from "next-translate/useTranslation";
import { apiRoutes, routes } from "../routes";
import { FormEvent, useState } from "react";
import { ironOptions } from "../lib/session";
import { IUser, ResponseError, SelectCountryOption } from "../types";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";

enum StepEnum {
  INFO = 1,
  MORE = 2,
  VERIF = 3,
}

const Register: NextPage = () => {
  /* Hooks */
  const { user, setUser } = useCurrentUser();
  const { t } = useTranslation("common");
  /* States */
  const [step, setStep] = useState<number>(StepEnum.INFO);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  /* Default France Country */
  const [country, setCountry] = useState<SelectCountryOption | undefined>(
    countriesJson.find((x) => x.code.toUpperCase() === "FR")
      ? {
          label: countriesJson.find((x) => x.code.toUpperCase() === "FR")
            ?.name!!,
          value: countriesJson.find((x) => x.code.toUpperCase() === "FR")
            ?.code!!,
          plainObject: countriesJson.find(
            (x) => x.code.toUpperCase() === "FR"
          )!!,
        }
      : undefined
  );
  const [city, setCity] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* Functions */
  const handleSubmit = (
    e: FormEvent,
    callback: (user: IUser | null, err?: ResponseError) => void
  ) => {
    e.preventDefault();
    const toastRegister = toast.loading("Inscription en cours...");
    setLoading(true);
    axios
      .post(apiRoutes.register, {
        username,
        email,
        password,
        passwordConfirm: passwordConfirm,
        country: country?.plainObject,
        city,
      })
      .then((response) => {
        toast.success("Votre inscription a été validée !", {
          id: toastRegister,
        });
        callback(response.data, undefined);
      })
      .catch((err: AxiosError<any, any>) => {
        toast.error(err.response?.data.message, {
          id: toastRegister,
        });
        callback(null, err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* Existing user, redirect to home */
  if (user) Router.push(routes.home);

  /* Render */
  return (
    <div>
      <Head>
        <title>NextJS Boilerplate - S{"'"}inscrire</title>
        <meta
          name="description"
          content="BoilerNext - A NextJS - Tailwind - Typescript Boilerplate"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-main flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">{t("CreateAccount")}</h2>
              <p>
                {t("CreateAccount_description")}{" "}
                <Link
                  href={routes.login}
                  className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-200 ease-in-out"
                >
                  {t("Register_alreadyAnAccount?")}
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                {step === StepEnum.INFO ? (
                  <Step1
                    step={step}
                    setStep={setStep}
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                  />
                ) : (
                  step === StepEnum.MORE && (
                    <Step2
                      step={step}
                      setStep={setStep}
                      country={country}
                      setCountry={setCountry}
                      city={city}
                      setCity={setCity}
                      formHandler={handleSubmit}
                      setUser={setUser}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type StepProps = {
  step: number;
  setStep: (step: number) => void;
};

interface Step1Props extends StepProps {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const Step1: React.FC<Step1Props> = ({
  step,
  setStep,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("common");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    //Check email validity
    axios
      .get(apiRoutes.checkunicity, {
        params: {
          username,
          email,
        },
      })
      .then((response) => {
        setStep(step + 1);
      })
      .catch((err: AxiosError<any, any>) => {
        toast.error(err.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputText
        type={"email"}
        value={email}
        required
        label={t("Email")}
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        additionnalClassname="w-full"
      />
      <InputText
        type={"text"}
        value={username}
        required
        label={"Username"}
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        additionnalClassname="w-full"
      />
      <InputText
        type={"password"}
        value={password}
        label={"Mot de passe"}
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        additionnalClassname="w-full"
      />

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <Link
            href={routes.login}
            className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-200 ease-in-out"
          >
            {t("Register_alreadyAnAccount?")}
          </Link>
        </div>
      </div>

      <div>
        <Button disabled={loading} loading={loading} type={"submit"}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </div>
    </form>
  );
};

interface Step2Props extends StepProps {
  country: SelectCountryOption | undefined;
  setCountry: (country: SelectCountryOption) => void;
  city: string;
  setCity: (city: string) => void;
  formHandler: (
    e: FormEvent,
    callback: (user: IUser | null, err?: ResponseError) => void
  ) => void;
  setUser: (user: IUser | null) => void;
}

const Step2: React.FC<Step2Props> = ({
  city,
  setCity,
  country,
  setCountry,
  formHandler,
  setUser,
  step,
  setStep,
}) => {
  const { t } = useTranslation("common");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    formHandler(e, (user, err) => {
      setLoading(false);
      setUser(user);
    });
  };

  return (
    <form
      onChange={() => setError(null)}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <SelectCountry
        label="Pays"
        onChange={(option: any) => setCountry(option)}
        value={country}
        isClearable={false}
      />
      <InputText
        type={"text"}
        value={city}
        required
        label={"Ville"}
        name="city"
        id="city"
        onChange={(e) => setCity(e.target.value)}
        additionnalClassname="w-full"
      />
      <div className="flex gap-2">
        <Button shape="outline" type="button" onClick={() => setStep(step - 1)}>
          {t("Back")}
        </Button>
        <Button type={"submit"} loading={loading} disabled={loading}>
          {t("Validate")}
        </Button>
      </div>
    </form>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (user !== undefined) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        //user: req.session.user,
      },
    };
  },
  ironOptions
);

export default Register;
