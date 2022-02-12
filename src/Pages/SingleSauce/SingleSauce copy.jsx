import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const SingleSauce = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sauce, setSauce] = useState([]);
    const { user } = useContext(UserContext);
    const [spinner, setSpinner] = useState(false);
    const [like, setLike] = useState()
    const myId = user.userId;



    useEffect(() => {
        if (user) {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "BEARER " + user.token);

            function testLike () {
                const data = sauce.usersLiked;
                const result = data.find( user => user === myId)
                setLike(result)
                console.log("testLike", result);
            }
            async function getSauces() {
                setSpinner(true);
                await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id, {
                    method: "GET",
                    headers: myHeaders,
                })
                    .then((res) => res.json())
                    .then((res) => {
                        const resData =  res;
                        setSauce( resData);
                        setSpinner(false);
                        testLike()
                    });
            }



            getSauces();
        }
    }, []);



    console.log("sauce : ", sauce);
    // console.log("Id : ", user.userId);

    function handleBack(e) {
        e.preventDefault();
        navigate("/");
    }
    function handleModify(e) {
        e.preventDefault();
        
    }
    function handleDelete(e) {
        e.preventDefault();
        
    }

    return (
        <>
            <div className="singleSauce__Container">
                <div className="left">
                    <img src={sauce.imageUrl} alt={sauce.name} />
                </div>
                <div className="right">
                    <header>
                        <h2>{sauce.name}</h2>
                    </header>
                    <div>By {sauce.manufacturer}</div>
                    <h3>Description</h3>
                    <div>{sauce.description}</div>
                    <div>
                        <AiOutlineLike className={like ? "like" : null} />
                        {sauce.likes}
                        <AiOutlineDislike />
                        {sauce.dislikes}
                    </div>
                    <div>
                        <button className="btn" onClick={(e)=>handleBack(e)}>BACK</button>
                        <button className="btn btn-modify" onClick={(e)=>handleModify(e)} >MODIFY</button>
                        <button className="btn btn-delete" onClick={(e)=>handleDelete(e)} >DELETE</button>
                    </div>
                </div>
            </div>

            {spinner ? <div className="Loader"></div> : null}
        </>
    );
};

export default SingleSauce;
