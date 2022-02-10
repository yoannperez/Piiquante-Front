import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
    const {register, handleSubmit, formState: { errors },} = useForm();
    // console.log(errors);
    

    const signup = async (data, e) => {
        e.preventDefault();
        await fetch( process.env.REACT_APP_API_ADRESS + "/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(async (res) => {
                const resData = await res;
                console.log(resData);
                if (resData.status === "success") {
                    //   setMailAdress(getValues('email'));
                    // alert("Message Sent");
                } else if (resData.status === "fail") {
                    console.log("Message failed to send");
                    // alert("Message failed to send");
                }
            });
    };
    
    return (
        <div className='logContainer'>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit(signup)}>
                <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="password" placeholder="Password" {...register("password", { required: true })} />

                <input type="submit" value="Créer un compte"/>
            </form>
        </div>
    );
};

export default Signup;
