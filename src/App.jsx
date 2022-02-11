import Navigation from "./components/Navigation";
import "./styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Sauces from "./Pages/Sauces";
import { useEffect, useContext } from "react";
import { UserContext } from "./utils/context/context";

function App() {
    const { user, setUser, refresh } = useContext(UserContext);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("PiiquanteUser")));
        // setUser(localStorage.getItem("PiiquanteUser"));
        // console.log(user);
        // eslint-disable-next-line
    }, [refresh]);

    return (
        <>
            <Navigation />
            {user ? (
                <Routes>
                    <Route path="/" element={<Sauces />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            )}
        </>
    );
}

export default App;
