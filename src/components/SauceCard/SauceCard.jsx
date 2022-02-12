import React from "react";
import { useNavigate } from "react-router-dom";

const SauceCard = (sauce) => {
    let data = { ...sauce.sauce };
    let navigate = useNavigate()

    function handleClick (e) {
        e.preventDefault()
        navigate(`/sauce/${data._id}`)
        // alert (`coucou ${data._id}` )
    }
    return (
        <div className="cardContainer" onClick={(e) => handleClick(e)}>
            <img src={data.imageUrl} alt={data.name} />
            <div>{data.name}</div>
            <div>Heat :{data.heat} / 10</div>
        </div>
    );
};

export default SauceCard;
