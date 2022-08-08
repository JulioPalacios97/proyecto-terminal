import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";

import Header from "./components/layouts/Header";
import MainPages from "./components/index";
import Footer from "./components/layouts/Footer";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop>
          <div>
            <Header />
            <MainPages />
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    </DataProvider>
  );
}

export default App;
