import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";


const Login = () => {
    const {register, handleSubmit, formState: { errors }, } = useForm();
    const {refresh, setRefresh } = useContext(UserContext);

    console.log(errors);

    const login = async (data, e) => {
        e.preventDefault();
        await fetch(process.env.REACT_APP_API_ADRESS + "/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(async (res) => {
                const resData = await res;
                console.log("res data",resData);
                if (resData.token) {
                    localStorage.setItem("PiiquanteUser", JSON.stringify(resData));
                    setRefresh(!refresh)

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
