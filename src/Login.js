import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { setNickname } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const nickname = form.name.value;

        if (form.checkValidity()) {
            setNickname(nickname);
            navigate("/countdown");
        }
    };

    return ( 
        <div className="login-main-container">
            <div className="login-title-container">
                <h1 className="login-title">Insert your nickname below</h1>
            </div>
            <div className="form-container">
                <form className="login-form" action="/countdown" method="GET" onSubmit={handleSubmit}>
                    <input className="login-input" type="text" minLength="4" maxLength="15" pattern="[a-zA-Z]+" title="Debe contener solo letras mayúsculas o minúsculas y tener entre 4 y 10 caracteres" name="name" placeholder="Nickname here..." required/>
                    <button className="login-button" type="submit">Start</button>
                </form>
            </div>
        </div>
    );
}

export default Login