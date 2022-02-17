import React from "react";
import { useNavigate } from "react-router-dom";

const SauceCard = (sauce) => {
    let data = { ...sauce.sauce };
    let navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate(`/sauce/${data._id}`);
        // alert (`coucou ${data._id}` )
    }
    return (
        <article className="cardContainer" onClick={(e) => handleClick(e)}>
            <figure className="cardImage">
                <img src={data.imageUrl} alt={data.name} />
            </figure>
            <div className="sauceInfos">
                <header>
                    <h2>{data.name}</h2>
                    <p>Par : {data.manufacturer}</p>
                </header>

                <div>     
                    <em>Force : </em> {data.heat} / 10

                </div>
            </div>
        </article>
    );
};

export default SauceCard;
