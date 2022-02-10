import React from "react";
import { Link } from "react-router-dom";
import flame from "../../assets/img/flame.png";

const Navigation = () => {
    return (
        <>
            <header>
                <div className="navContainer">
                    <div className="navContainer__brand">
                        <img src={flame} alt="piiquante-logo" />
                        <div className="navContainer__brand-name">
                            <h1> HOT TAKES </h1>
                            <h5>THE WEB'S BEST HOT SAUCE REVIEWS </h5>
                        </div>
                    </div>
                    <nav>
                        <Link to="/register">SIGN UP</Link>
                        <Link to="/">LOGIN</Link>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navigation;




