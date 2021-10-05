import React, { createContext } from "react";
import ServicesAPI from "./api/ServicesApi";
import ConsultantsAPI from "./api/ConsultantsApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    servicesAPI: ServicesAPI(),
    consultantsAPI: ConsultantsAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
