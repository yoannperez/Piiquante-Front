import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useFetch } from "../../utils/hooks/index";

const LikeDislike = (id) => {
    const { user } = useContext(UserContext);
    // const [datas, setDatas] = useState();

    const [like, setLike] = useState(0);

    const [spinner, setSpinner] = useState(false);
    // const [refresh, setRefresh] = useState(false);
    const [sendApi, setSendApi] = useState(false);

    const { data, isLoading, error } = useFetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id.id);

    useEffect(() => {
        if (Object.keys(data).length != 0) {
        function userId(userid) {
            return userid === user.userId;
        }
        if (data.usersLiked.find(userId)) {
            setLike(1);
        } else if (data.usersDisliked.find(userId)) {
            setLike(-1);
        } else {
            setLike(0);
        }
    }
    }, [data]);


    const firstUpdate = useRef(true);

    // useEffect(() => {
    //     const EffectHeader = myHeaders;

    //     if (firstUpdate.current) {
    //         firstUpdate.current = false;
    //         return;
    //     }

    //     setSpinner(true);
    //     let toSend = {
    //         userId: user.userId,
    //         like: like,
    //     };
    //     async function fetchLike() {
    //         try {
    //             await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id.id + "/like", {
    //                 method: "POST",
    //                 headers: EffectHeader,
    //                 body: JSON.stringify(toSend),
    //             });
    //         } catch (err) {
    //             console.log(err);
    //             // setError(true);
    //         } finally {
    //             setRefresh(!refresh);
    //         }
    //     }
    //     fetchLike();
    // }, [sendApi]);

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

    if (error) {
        return <span>Il y a un problème</span>;
    }

    if (data) {
        return (
            <>
                {isLoading ? (
                    <div className="Loader" style={{ marginTop: "0" }}></div>
                ) : (
                    <div>
                        <button className={`likeComponent + ${like === 1 ? "like" : ""}`} onClick={(e) => handleLike(e)} disabled={like === -1}>
                            <AiOutlineLike size={30} />
                        </button>
                        <span>{data.likes}</span>

                        <button className={`likeComponent + ${like === -1 ? "disLike" : ""}`} onClick={(e) => handleDisLike(e)} disabled={like === 1}>
                            <AiOutlineDislike size={30} />
                        </button>

                        {data.dislikes}
                    </div>
                )}
            </>
        );
    } else {
        return null;
    }
};

export default LikeDislike;
