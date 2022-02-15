
export function postFetch(url, method, user, datas) {
    const { image, ...cleanData } = datas;
    

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `BEARER ${user.token}`);

    const formData = new FormData();
    formData.append("sauce", JSON.stringify(cleanData));
    formData.append("image", datas.image[0]);

   

    async function fetchData() {
        var returnData = {};
        try {
            const response = await fetch(url, {
                method: method,
                headers: myHeaders,
                body: formData,
            });
            const data = await response.json();
            returnData = data;
        } catch (err) {
            console.log(err);
        } finally {
            console.log('====================================');
            console.log("rntData",returnData);
            console.log('====================================');
            return( returnData)
        }
    }
    fetchData();
  
}

