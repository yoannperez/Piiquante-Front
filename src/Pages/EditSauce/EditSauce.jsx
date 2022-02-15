import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/context/context";
import { useForm } from "react-hook-form";
import { updateFetch } from "../../utils/fetchFunc";

const EditSauce = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [spinner, setSpinner] = useState(false);
    const { user } = useContext(UserContext);

    const url = process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id;
    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [preview, setPreview] = useState("");
    const watchHeat = watch("heat", 1);
    const watchImage = watch("image");

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

                setPreview(data.imageUrl);
                reset(data);
            } catch (err) {
                console.log(err);
            } finally {
                setSpinner(false);
            }
        }

        fetchData();
    }, []);

    async function onSubmit(data) {
        if (watchImage !== undefined && watchImage.length === 1) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `BEARER ${user.token}`);

            
            const { image, _id, ...toSend } = data;

            const formData = new FormData();
            formData.append("sauce", JSON.stringify(toSend));
            formData.append("image", data.image[0]);

            const options = {
                method: "PUT",
                headers: myHeaders,
                body: formData,
            };
            await updateFetch(url, options);
            navigate("/");
        }
       
        else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `BEARER ${user.token}`);
            myHeaders.append("Content-Type", "application/json");

            const url = process.env.REACT_APP_API_ADRESS + "/api/sauces/" + id;
            const { image, _id, ...toSend } = data;

            const options = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(toSend),
            };
            await updateFetch(url, options);
            navigate("/");
        }
    }

    useEffect(() => {
        if (watchImage !== undefined && watchImage.length === 1) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(watchImage[0]);
        }
    }, [watchImage]);

    return (
        <>
            {spinner ? (
                <div className="Loader"></div>
            ) : (
                <div className="formContainer">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name">Nom de la sauce</label>
                            <input type="text" id="name" placeholder="Name" {...register("name", { required: true, min: 3, maxLength: 100, pattern: /[a-zA-Z0-9]/i })} />
                            {errors.name && <span className="alerte">Donner un nom à cette sauce</span>}
                        </div>
                        <div>
                            <label htmlFor="manufacturer">Fabriquant</label>
                            <input type="text" id="manufacturer" placeholder="Fabriquant" {...register("manufacturer", { required: true, min: 3, pattern: /[a-zA-Z0-9]/i })} />
                            {errors.manufacturer && <span className="alerte">Indiquer le fabriquant</span>}
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" placeholder="Description" {...register("description", { required: true, pattern: /[a-zA-Z0-9^.=:€]/i })} />
                            {errors.description && <span className="alerte">Indiquer une description</span>}
                        </div>

                        <div id="fileContainer">
                            <label className="button" htmlFor="file">
                                <div className="img__PlaceHolder">
                                    {!preview ? (
                                        <span>
                                            Cliquer ici pour importer <br /> une illustration
                                        </span>
                                    ) : (
                                        <img src={preview} alt="" />
                                    )}
                                </div>
                            </label>
                            <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" {...register("image", { required: false })}></input>
                            {errors.image && <span className="alerte"> Il faut choisir une image !</span>}
                        </div>

                        <div>
                            <label htmlFor="mainIngredient">Ingrédient principal</label>
                            <input id="mainIngredient" type="text" placeholder="Qu'est-ce qui pique ?" {...register("mainPepper", { required: true, min: 3, pattern: /[a-zA-Z0-9^.=:€]/i })} />
                            {errors.mainPepper && <span className="alerte">Quel est le principal piquant ?</span>}
                        </div>
                        <div>
                            <label htmlFor="force">Force</label>
                            <div id="forceContainer">
                                <input id="force" className="slider" type="range" defaultValue="1" {...register("heat", { required: true })} step="1" max="10" min="1" />
                                <span>{watchHeat}</span>
                                {errors.force && <span className="alerte">Indiquer le fabriquant</span>}
                            </div>
                        </div>
                        <input type="submit" value="Mettre à jour la sauce" />
                    </form>
                </div>
            )}
        </>
    );
};

export default EditSauce;
