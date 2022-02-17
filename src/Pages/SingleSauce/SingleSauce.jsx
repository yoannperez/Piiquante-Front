import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../utils/context/context";
import LikeDislike from "./LikeDislike";
import { deleteFetch} from "../../utils/fetchFunc";

const SingleSauce = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sauce, setSauce] = useState([]);
    const { user } = useContext(UserContext);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
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
        navigate(`/edit-sauce/${id}`)
    }
    async function handleDelete(e) {
        e.preventDefault();

        const url = process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id;
        if (window.confirm("Sûr de supprimer cette sauce ?")) {
            await deleteFetch(url, "DELETE", user);
            navigate("/");
        }
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
                        <h3>Piment principal</h3>
                        <div>{sauce.mainPepper}</div>
                        <div className="LikeDislike">
                            <LikeDislike id={id} />
                        </div>
                        <div className="SingleSauce__BTN">
                            <button className="btn" onClick={(e) => handleBack(e)}>
                                RETOUR A LA LISTE
                            </button>
                            {sauce.userId === user.userId ? (
                                <div className="modifyDelete">
                                    <button className="btn btn-modify" onClick={(e) => handleModify(e)}>
                                        MODIFY
                                    </button>
                                    <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
                                        DELETE
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleSauce;
