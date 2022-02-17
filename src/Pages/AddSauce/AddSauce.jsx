import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../utils/context/context";
import { postFetch } from "../../utils/fetchFunc";

const AddSauce = () => {
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user } = useContext(UserContext);
    const url = process.env.REACT_APP_API_ADRESS + "/api/sauces/";
    const watchHeat = watch("heat", 1);
    const watchImage = watch("image");
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (watchImage !== undefined && watchImage.length === 1) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(watchImage[0]);
        }
    }, [watchImage]);

    async function onSubmit(data) {
        let toSend = { ...data, userId: user.userId };
        await postFetch(url, "POST", user, toSend);
        navigate("/");
    }

    return (
        <div className="formContainer">
            <h2>Ajouter une sauce</h2>
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
                    <textarea id="description" rows="5" placeholder="Description" {...register("description", { required: true, pattern: /[a-zA-Z0-9^.=:€]/i })} />
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
                    <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" {...register("image", { required: true })}></input>
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
                        {/* <input type="number" placeholder={watchHeat} disabled></input> */}
                        <span>{watchHeat}</span>
                        {errors.force && <span className="alerte">Indiquer le fabriquant</span>}
                    </div>
                </div>
                <input type="submit" value="Soumettre la sauce" />
            </form>
        </div>
    );
};

export default AddSauce;
