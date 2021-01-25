import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <p className="border-top pt-1 text-center shadow-sm">
      <b>
         &copy; Another site by{" "}
        <Link
          style={{ color: "darkOrange", textDecoration: "none", fontFamily: 'Marck Script' }}
          to="/naor-diz-site"
        >
          <i>Naor Diz.</i>
        </Link>
        , {new Date().getFullYear()}
      </b>
    </p>
  );
};

export default Footer;
