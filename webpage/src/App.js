import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";

import Header from "./components/layouts/Header";
import MainPages from "./components/index";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <DataProvider>
      <Router>
        <div>
          <Header />
          <MainPages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
