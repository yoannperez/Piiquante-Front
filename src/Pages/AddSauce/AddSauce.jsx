import React,{ useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../utils/context/context";
import { postFetch } from "../../utils/fetchFunc";


const AddSauce = () => {
    const {register, handleSubmit,formState: { errors },} = useForm();
    const { user } = useContext(UserContext);
    const url = process.env.REACT_APP_API_ADRESS + "/api/sauces/";
   


    // const onSubmit = (data) => {
    async function onSubmit  (data)  {
        
        let toSend = {...data, userId:user.userId}
        
        postFetch(url, "POST", user, toSend )
    //    const rtnData = await PostFetch(url, "POST", user, toSend )

    //    console.log('====================================');
    //    console.log('rtnData', postFetch(url, "POST", user, toSend ));
    //    console.log('====================================');

    }



    console.log("PAS OK :", errors);
    return (
        <div className="logContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Name" {...register("name", { required: true, min: 3, maxLength: 100, pattern: /[a-zA-Z0-9]/i })} />
                <input type="text" placeholder="Manufacturer" {...register("manufacturer", { required: true, min: 3, pattern: /[a-zA-Z0-9]/i })} />
                <textarea placeholder="Description" {...register("description", { pattern: /[a-zA-Z0-9^.=:€]/i })} />
                <div>
                <label for="file">Sélectionner des images à uploader (PNG, JPG)</label>
                <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" {...register("image", { required: true})}></input>
                </div>
                <input type="text" placeholder="Main Pepper Ingredient" {...register("mainPepper", { required: true, min: 3, pattern: /[a-zA-Z0-9^.=:€]/i })} />
                <input type="range" placeholder="Heat" {...register("heat", { required: true})} step="1" max= "10" min= "1"/>

                <input type="submit" value="Soumettre" />
            </form>
        </div>
    );
};

export default AddSauce;
