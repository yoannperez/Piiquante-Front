import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../utils/context/context";
import { postFetch } from "../../utils/fetchFunc";
// linear-gradient(to right, #FFC600 0%, #CF1512 100%)
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Nom de la sauce</label>
                    <input type="text" id="name" placeholder="Name" {...register("name", { required: true, min: 3, maxLength: 100, pattern: /[a-zA-Z0-9]/i })} />
                </div>
                <div>
                    <label htmlFor="manufacturer">Fabriquant</label>
                    <input type="text" id="manufacturer" placeholder="Fabriquant" {...register("manufacturer", { required: true, min: 3, pattern: /[a-zA-Z0-9]/i })} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" placeholder="Description" {...register("description", { pattern: /[a-zA-Z0-9^.=:€]/i })} />
                </div>

                <div id="fileContainer">
                    <label className="button" htmlFor="file">
                    <div className="img__PlaceHolder">
                    {!preview ? <span>Cliquer ici pour importer <br/> une illustration</span> :<img src={preview} alt="" />}
                
                </div>
                    </label>
                    <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" {...register("image", { required: true })}></input>
                </div>
                {/* <div className="img__PlaceHolder">
                    {!preview ? <span>Cliquer pour importer une illustration</span> :<img src={preview} alt="" />}
                
                </div> */}

                <div>
                    <label htmlFor="mainIngredient">Ingrédient principal</label>
                    <input id="mainIngredient" type="text" placeholder="Main Pepper Ingredient" {...register("mainPepper", { required: true, min: 3, pattern: /[a-zA-Z0-9^.=:€]/i })} />
                </div>
                <div>
                    <label htmlFor="force">Force</label>
                    <div id="forceContainer">
                        <input id="force" className="slider" type="range" defaultValue="1" {...register("heat", { required: true })} step="1" max="10" min="1" />
                        {/* <input type="number" placeholder={watchHeat} disabled></input> */}
                        <span>{watchHeat}</span>
                    </div>
                </div>
                <input type="submit" value="Soumettre la sauce" />
            </form>
        </div>
    );
};

export default AddSauce;
