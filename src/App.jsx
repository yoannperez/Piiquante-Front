import Navigation from "./components/Navigation";
import "./styles/index.scss";
import { Routes, Route } from "react-router-dom";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";

function App() {
    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/register" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;

// const Layout = () => {
//     return (
//         <div>
//             <Navigation />
//         </div>
//     );
// };
