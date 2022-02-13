import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const LikeDislike = (id) => {
    const { user } = useContext(UserContext);
    const [datas, setDatas] = useState();

    const [like, setLike] = useState(0);

    const [spinner, setSpinner] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [sendApi, setSendApi] = useState(false);

    const firstUpdate = useRef(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "BEARER " + user.token);

    useEffect(() => {
        setSpinner(true);
        if (user && id) {
            const EffectHeader = myHeaders;



            function userId(userid) {
                // Function for finding in Array
                return userid === user.userId;
            }
            async function fetchData() {
                try {
                    const response = await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id.id, {
                        method: "GET",
                        headers: EffectHeader,
                      
                    });
                    const data = await response.json();
                    setDatas(data);
                    if (data.usersLiked.find(userId)) {
                        setLike(1);
                    } else if (data.usersDisliked.find(userId)) {
                        setLike(-1);
                    } else {
                        setLike(0);
                    }
                    
                } catch (err) {
                    console.log(err);
                    // setError(true);
                } finally {
                    setSpinner(false);
                }
            }
            fetchData();
        }
        return () => {
            setSpinner(false);
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id.id, refresh]);

    useEffect(() => {
        const EffectHeader = myHeaders;

        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        setSpinner(true);
        let toSend = {
            userId: user.userId,
            like: like,
        };
        async function fetchLike() {
            try {
                await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id.id + "/like", {
                    method: "POST",
                    headers: EffectHeader,
                    body: JSON.stringify(toSend),
                });
            } catch (err) {
                console.log(err);
                // setError(true);
            } finally {
                setRefresh(!refresh);
            }
        }
        fetchLike();
    }, [sendApi]);

    function handleLike(e) {
        e.preventDefault();

        if (like === 0) {
            setLike(1);
        } else {
            setLike(0);
        }
        setSendApi(!sendApi);
    }

    function handleDisLike(e) {
        e.preventDefault();
        if (like === 0) {
            setLike(-1);
        } else {
            setLike(0);
        }
        setSendApi(!sendApi);
    }

    if (datas) {
        return (
            <>
                {spinner ? (
                    <div className="Loader" style={{ marginTop: "0" }}></div>
                ) : (
                    <div>
                        <button  className={`likeComponent + ${(like === 1)? "like" : ""}`} onClick={(e) => handleLike(e)} disabled={like === -1}>
                            <AiOutlineLike size={30}/>
                        </button>
                        <span>{datas.likes}</span>

                        <button className={`likeComponent + ${(like === -1) ? "disLike" : ""}`} onClick={(e) => handleDisLike(e)} disabled={like === 1}>
                            <AiOutlineDislike size={30}/>
                        </button>

                        {datas.dislikes}
                    </div>
                )}
            </>
        );
    } else {
        return null;
    }
};

export default LikeDislike;
