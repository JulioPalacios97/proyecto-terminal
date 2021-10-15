import { createContext } from "react";
import ServicesAPI from "./api/ServicesAPI";
import SectionsAPI from "./api/SectionsAPI";
import QuotesAPI from "./api/QuotesAPI";
import ClientsAPI from "./api/ClientsAPI";
import ConsultantsAPI from "./api/ConsultantsAPI";
import NewsAPI from "./api/NewsAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    servicesAPI: ServicesAPI(),
    sectionsAPI: SectionsAPI(),
    quotesAPI: QuotesAPI(),
    clientsAPI: ClientsAPI(),
    consultantsAPI: ConsultantsAPI(),
    newsAPI: NewsAPI(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
