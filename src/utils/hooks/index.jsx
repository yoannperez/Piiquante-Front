import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../utils/context/context";




export function useGetFetch(url, update) {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!url || !user) return;
        setLoading(true);
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "BEARER " + user.token);

        async function fetchData() {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: myHeaders,
                });
                const data = await response.json();
                setData(data);

            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, update]);
    return { isLoading, data, error };
}

