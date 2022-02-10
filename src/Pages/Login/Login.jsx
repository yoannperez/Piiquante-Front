import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    console.log(errors);

    const login = async (data, e) => {
        e.preventDefault();
        await fetch("http://localhost:3000/api/auth/login", {
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
        <div className="logContainer">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(login)}>
                <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="password" placeholder="Password" {...register("password", { required: true })} />

                <input type="submit" value="Se connecter" />
            </form>
        </div>
    );
};

export default Login;
