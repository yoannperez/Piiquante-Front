import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const LikeDislike = (id) => {
    // const {id} = {...id}
    const [like, setLike] = useState();
    // const [disLike, setDisLike] = useState();

    const [sauce, setSauce] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const { user } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "BEARER " + user.token);

    useEffect(() => {
        setSpinner(true);

        function userId(userid) {
            return userid === user.userId;
        }

        async function fetchData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id.id, {
                    method: "GET",
                    headers: myHeaders,
                });
                const data = await response.json();
                setSauce(data);
                console.log(data);
                data.usersLiked.find(userId) ? setLike(1) : setLike(0);
                // data.usersDisliked.find(userId) ? setDisLike(1) : setLike(0);

                
            } catch (err) {
                console.log(err);
                // setError(true);
            } finally {
                setSpinner(false);
            }
        }

        fetchData();
    }, [refresh]);

    function handleLike(e) {
        e.preventDefault();
        console.log("Hello");
        console.log(like);
        
        async function fetchData() {
            let toSend = {
                userId: user.userId,
                like: Number(!like),
            };
            try {
                await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id.id + "/like", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(toSend),
                });
            } catch (err) {
                console.log(err);
                // setError(true);
            } finally {
                setSpinner(false);
                setRefresh(!refresh);
            }
        }
        fetchData();
    }

    console.log("is liked : ", like);

    return (
        <>
            {spinner ? (
                <div className="Loader"></div>
            ) : (
                <div>
                    <AiOutlineLike className={like ? "like" : null} onClick={(e) => handleLike(e)} />
                    {sauce.likes}
                    <button disabled={like}>
                        <AiOutlineDislike />
                    </button>

                    {sauce.dislikes}
                </div>
            )}
        </>
    );
};

export default LikeDislike;
