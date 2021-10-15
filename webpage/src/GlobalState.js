import React, { createContext } from "react";
import ServicesAPI from "./api/ServicesApi";
import ConsultantsAPI from "./api/ConsultantsApi";
import NewsAPI from "./api/NewsApi";
import CategoriesAPI from "./api/CategoriesApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    servicesAPI: ServicesAPI(),
    consultantsAPI: ConsultantsAPI(),
    newsAPI: NewsAPI(),
    categoriesAPI: CategoriesAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
