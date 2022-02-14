import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../utils/context/context";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { refresh, setRefresh } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useState()


    const login = async (data, e) => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_API_ADRESS + "/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res, err) => res.json())
            .then(async (res, err) => {
                const resData = await res;
                if (resData.token) {
                    localStorage.setItem("PiiquanteUser", JSON.stringify(resData));
                    setRefresh(!refresh);
                }
                
                setErrorMsg(res.error);
                
            })
            .catch(function (err) {
                window.alert(
                  "Erreur de connection réseau (API Down), nous n'avons pas pu communiquer avec le serveur. Veuillez vérifier votre configuration."
                );
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
            {errorMsg && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            </div>
          )}
        </div>
    );
};

export default Login;
