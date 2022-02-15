export function postFetch(url, method, user, datas) {
    const { image, ...cleanData } = datas;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `BEARER ${user.token}`);

    const formData = new FormData();
    formData.append("sauce", JSON.stringify(cleanData));
    formData.append("image", datas.image[0]);

    async function fetchData() {
        try {
            const response = await fetch(url, {
                method: method,
                headers: myHeaders,
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        } finally {
        }
    }
    return fetchData();
}

export function deleteFetch(url, method, user) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `BEARER ${user.token}`);

    async function fetchData() {
        try {
            const response = await fetch(url, {
                method: method,
                headers: myHeaders,
            });
            const data = await response.json();
            console.log("rntData", data);
            return data;
        } catch (err) {
            console.log(err);
            alert("Erreur de communication avec le serveur.");
        } finally {
        }
    }
    return fetchData();
}
