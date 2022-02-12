import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import LikeDislike from "./LikeDislike";

const SingleSauce = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sauce, setSauce] = useState([]);
    const { user } = useContext(UserContext);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("PiiquanteUser"))
        // if (!user) return;
        setSpinner(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "BEARER " + user.token);

        async function fetchData() {
            setSpinner(true);
            try {
                const response = await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id, {
                    method: "GET",
                    headers: myHeaders,
                });
                const data = await response.json();
                setSauce(data);
            } catch (err) {
                console.log(err);

                // setError(true);
            } finally {
                setSpinner(false);
            }
        }

        fetchData();
    }, []);

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
            {spinner ? (
                <div className="Loader"></div>
            ) : (
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
                            <LikeDislike id={id} />
                        </div>
                        <div>
                            <button className="btn" onClick={(e) => handleBack(e)}>
                                BACK
                            </button>
                            <button className="btn btn-modify" onClick={(e) => handleModify(e)}>
                                MODIFY
                            </button>
                            <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleSauce;
