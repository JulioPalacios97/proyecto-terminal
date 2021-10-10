import React from "react";
import LogoFooter from "../images/logo-footer.png";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container text-center">
        <div className="footer-cta py-5">
          <div className="row">
            <div className="">
              <div className="single-cta">
                <img
                  className="logo-footer"
                  src={LogoFooter}
                  alt="logofooter"
                />
                <div className="cta-text">
                  <h5>
                    Oficina: Centralia Business Park & Plaza, Sm. 301, Mz. 3,
                    Lt. 3, Local 209, Segundo Piso. Boulevard Luis Donaldo
                    Colosio, C.P. 77536, Municipio de Benito Juárez, Cancún,
                    Quintana Roo, México.
                  </h5>
                </div>
                {/*<div className="footer-social-icon" style={{ margin: "1%" }}>
                  <i className="fab fa-twitter m-2"></i>
                  <i className="fab fa-facebook-f m-2"></i>
                  <i className="fab fa-instagram m-2"></i>
                  <i className="fab fa-youtube m-2"></i>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
