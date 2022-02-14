export function postFetch(url, method, user, datas) {
    const { image, ...cleanData } = datas;
    

    const myHeaders = new Headers();
    // myHeaders.append('Authorization', `BEARER ${user.token}`);
    // myHeaders.append('Content-Type', 'multipart/form-data');

   


    const formData = new FormData();
    formData.append ('sauce', JSON.stringify(cleanData))
    formData.append('image', datas.image[0]);

    console.log("datas :", datas.image[0]);
    // console.log("destructuring :", cleanData);
    // console.log("OKFetch :", user.token);
    // console.log("myHeaders :",myHeaders);

    function fetchData() {

        // const options = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: formData,

        //     // If you add this, upload won't work
        //     // headers: {
        //     //   'Content-Type': 'multipart/form-data',
        //     // }
        //   };
        // //   delete options.headers['Content-Type'];
        //   fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/", options);



        fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces/", {
            method: "POST",
            headers: myHeaders,
            body: formData,
        });

        // try {
        //     await fetch(process.env.REACT_APP_API_ADRESS + "/api/sauces", {
        //         method: "POST",
        //         headers: myHeaders,
        //         body: formData,
        //     });
        //     const data = await response.json();
        //     setData(data);
        // } catch (err) {
        //     console.log(err);
        // } finally {
        // }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // return { isLoading, data, error };
}

// const handleSubmit = (e) => {
//     e.preventDefault();
//     if (content.length < 2) {
//         setError(true);
//     } else {
//         const post = {
//             text: content,
//             UserId: user.userId,
//         };

//         const formData = new FormData();
//         formData.append("post", JSON.stringify(post));
//         formData.append("image", image);

//             .post(process.env.REACT_APP_API_ADRESS + "/api/posts/", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             })
//             .then(() => {
//                 setError(false);
//                 setTextData("");
//                 getData();
//                 setEditPost(false);
//             });
//     }
// };
