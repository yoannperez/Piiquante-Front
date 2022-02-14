import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import flame from "../../assets/img/flame.png";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import logout from "../../assets/img/log-out.svg";
import grid from "../../assets/img/grid.svg";
import add from "../../assets/img/add.svg";

const Navigation = () => {
    const location = useLocation();

    const { user, refresh, setRefresh } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem("PiiquanteUser");
        navigate("/");
        setRefresh(!refresh);
    };
    const handleGrid = (e) => {
        e.preventDefault();
        navigate("/");
    };
    
    const handleAddSauce = (e) => {
        e.preventDefault();
        navigate("/add-sauce");
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
                            {location.pathname !== "/" ? <img src={grid} alt="" title="Retour à la liste" onClick={(e) => handleGrid(e)} /> : null}
                            {location.pathname === "/" ? <img src={add} alt="" title="Ajouter une sauce" onClick={(e)=> handleAddSauce(e)}/> : null}
                            <img src={logout} alt="" title="Se déconnecter" onClick={(e) => handleClick(e)} />
                        </nav>
                    ) : (
                        <nav>
                            {location.pathname === "/register" ? (
                                <Link to="/" title="Se connecter">
                                    Connexion
                                </Link>
                            ) : (
                                <Link to="/register" title="S'enregistrer">
                                    S'enregistrer
                                </Link>
                            )}
                        </nav>
                    )}
                </div>
            </header>
        </>
    );
};

export default Navigation;
