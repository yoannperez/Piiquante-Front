import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);
    
    return (
        <div className='logContainer'>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="password" placeholder="Password" {...register("Password", { required: true })} />

                <input type="submit" value="Créer un compte"/>
            </form>
        </div>
    );
};

export default Signup;
