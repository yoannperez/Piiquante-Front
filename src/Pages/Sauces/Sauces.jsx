import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";

const Sauces = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState ([])

    console.log('====================================');
    console.log(user);
    console.log('====================================');
    
    
    useEffect(() => {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "BEARER " + user.token);

        async function getSauces() {
            await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces", {
                method: "GET",
                headers: myHeaders,
            })
                .then((res) => res.json())
                .then(async (res) => {
                    const resData = await res;
                    setData(resData)
                    
                    console.log('====================================');
                    console.log(data);
                    console.log('====================================');
                    // console.log("res data", resData);
                    // if (resData.token) {
                    //     localStorage.setItem("PiiquanteUser", JSON.stringify(resData));
                    //     setRefresh(!refresh);
                    // }
                });
        }
        getSauces();
    }, []);

    return <div>Sauces 2 </div>;
    
};

export default Sauces;
