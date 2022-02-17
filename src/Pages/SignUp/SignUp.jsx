import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();
    // console.log(errors);

    const signup = async (data, e) => {
        e.preventDefault();
        await fetch(process.env.REACT_APP_API_ADRESS + "/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(async (res) => {
                const resData = await res;
                if (resData.error) {
                    setErrorMsg(resData.error.message);
                } else {
                    setErrorMsg(resData.message + "Vous allez être redirigé vers la page de connexion dans 3s.");
                    setTimeout(() => navigate("/"), 3000);
                }
            })
            .catch(function (err) {
                window.alert("Erreur de connection réseau (API Down), nous n'avons pas pu communiquer avec le serveur. Veuillez vérifier votre configuration.");
            });
    };

    return (
        <div className="logContainer">
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit(signup)}>
                <div className="inputFlex">
                    <input type="email" placeholder="Email" {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i })} />
                    {errors.email && <span>Email non conforme (ex: nom@domain.fr)</span>}
                </div>
                <div className="inputFlex">
                <input type="password" placeholder="Password" autoComplete="on" {...register("password", { required: true })} />
                {errors.password && <span>Ce champ est nécessaire</span>}
                </div>
                <input type="submit" value="Créer un compte" />
            </form>
            {errorMsg && (
                <div className="form-group">
                    <div className="serverResponse" role="alert">
                        {errorMsg}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
