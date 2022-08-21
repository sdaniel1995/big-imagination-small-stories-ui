import { useForm } from "react-hook-form";
import { TextField, Button, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { LoginFormData } from "../validations/loginSchema";
import LoginFormProps from "../interfaces/LoginFormProps";
import "../css/Login.css"

const Login = ({ show }: LoginFormProps) => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<LoginFormData>({ mode: "all", resolver: zodResolver(loginSchema) });

    const onSubmit = (data: object) => {
        console.log(data)
    };

    return (
        <div className="login">
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <h1>Log In</h1>
                <TextField
                    className="loginForm-input"
                    label="UserName"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username && errors.username.message}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined" />
                <TextField
                    className="loginForm-input"
                    type="password"
                    label="Password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }} variant="outlined" />
                <Button variant="text" className="auxBtn" id="forgotPassword">Forgot password?</Button>
                <Button variant="contained" type="submit" id="loginBtn">Login</Button>
                <Button variant="text" className="auxBtn" onClick={() => show(false)}>Continue as reader...</Button>
            </form>
        </div>
    )
}

export default Login