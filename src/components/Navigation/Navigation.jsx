import React from "react";
import { Link } from "react-router-dom";
import flame from "../../assets/img/flame.png";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import logout from '../../assets/img/log-out.svg'

const Navigation = () => {
    const { user, refresh, setRefresh } = useContext(UserContext);

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem("PiiquanteUser");
        setRefresh(!refresh);
    };

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
                    {user ? (
                        <nav>
                            <img src={logout} alt="Se déconnecter" onClick={(e) => handleClick(e)} />  
                        </nav>
                    ) : (
                        <nav>
                            <Link to="/register">SIGN UP</Link>
                            <Link to="/">LOGIN</Link>
                        </nav>
                    )}
                </div>
            </header>
        </>
    );
};

export default Navigation;
