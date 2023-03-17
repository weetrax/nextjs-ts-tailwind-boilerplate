import countriesJson from "../../../../constants/countries.json";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Select, { GroupBase, StylesConfig } from "react-select";
import useTranslation from "next-translate/useTranslation";
import { SelectCountryOption } from "@/types";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

interface SelectCountryProps extends StateManagerProps {
  label?: string;
  selectedCountry?: SelectCountryOption;
  setSelectedCountry?: (value: SelectCountryOption | undefined) => void;
}

const selectStyles:
  | StylesConfig<unknown, boolean, GroupBase<unknown>>
  | undefined = {
  input: (base) => ({
    ...base,
    color: "black",
  }),
  control: (base) => ({
    ...base,
    boxShadow: "none",
    padding: "0.125rem 1rem",
    borderRadius: "0.75rem",
    color: "black",
    borderColor: "rgb(212 212 212)",
    "&:hover": {
      borderColor: "#6466f1",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: "100",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    background: isFocused ? "#6466f1" : isSelected ? "#6466f1" : undefined,
    zIndex: 1,
    color: "black",
    "&:hover": {
      background: "#8385f4",
    },
  }),
};

const SelectCountry: React.FC<SelectCountryProps> = ({
  label,
  selectedCountry,
  setSelectedCountry,
  ...props
}) => {
  /* Hooks */
  const { t } = useTranslation("common");

  /* States */
  const [options, setOptions] = useState<SelectCountryOption[]>([]);

  /* Effect */
  useEffect(() => {
    let _options: SelectCountryOption[] = [];
    countriesJson.forEach((c) => {
      _options = [
        ..._options,
        { label: c.name, value: c.code, plainObject: c },
      ];
    });
    setOptions(_options);
  }, []);

  /* Render */
  return label ? (
    <div className="space-y-1">
      <label className="block text-sm font-medium" htmlFor={props.id}>
        {label}
      </label>
      <Select
        styles={selectStyles}
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        noOptionsMessage={() => <>{t("NoCountriesFound")}</>}
        loadingMessage={() => <>{t("LoadingCountries")}</>}
        placeholder={t("ChooseCountry")}
        options={options}
        isClearable
        {...props}
      />
    </div>
  ) : (
    <Select
      styles={selectStyles}
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      noOptionsMessage={() => <>{t("NoCountriesFound")}</>}
      loadingMessage={() => <>{t("LoadingCountries")}</>}
      placeholder={t("ChooseCountry")}
      options={options}
      isClearable
      {...props}
    />
  );
};

SelectCountry.propTypes = {
  //
};

export default SelectCountry;
