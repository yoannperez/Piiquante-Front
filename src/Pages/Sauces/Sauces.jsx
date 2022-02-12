import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";
import SauceCard from "../../components/SauceCard/SauceCard";

const Sauces = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        if (user) {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "BEARER " + user.token);

            async function getSauces() {
                setSpinner(true);
                await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces", {
                    method: "GET",
                    headers: myHeaders,
                })
                    .then((res) => res.json())
                    .then(async (res) => {
                        const resData = await res;
                        setData(await resData);
                        setSpinner(false);
                    });
            }
            getSauces();
        }
    }, []);

    

    return (
        <>
            {" "}
            {spinner ? (
                <div className="Loader"></div>
            ) : (
                <div className="saucesContainer">
                    {data
                        .sort((a, b) => b.id - a.id)
                        .map((sauce) => (
                            <SauceCard key={sauce._id} sauce={sauce} />
                        ))}
                </div>
            )}
        </>
    );
};

export default Sauces;
