import { useForm } from "react-hook-form";
import { TextField, Button, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { LoginFormData } from "../validations/loginSchema";
import "../css/Login.css"

interface LoginFormProps {
    show: Function
};

const Login = ({ show }: LoginFormProps) => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<LoginFormData>({ mode: "all", resolver: zodResolver(loginSchema) });

    const onSubmit = (data: object) => {
        console.log(data)
    };

    return (
        <div className="login" data-testid="login">
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <h1>Log In</h1>
                <TextField
                    data-testid="username"
                    className="loginForm-input"
                    label="User Name"
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
                    variant="outlined"
                />
                <TextField
                    data-testid="password"
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
                    }}
                    variant="outlined"
                />
                <Button data-testid="forgotPasswordBtn" variant="text" className="auxBtn" id="forgotPassword">Forgot password?</Button>
                <Button data-testid="loginBtn" variant="contained" type="submit" id="loginBtn">Login</Button>
                <Button data-testid="continueAsReaderBtn" variant="text" className="auxBtn" onClick={() => show(false)}>Continue as reader...</Button>
            </form>
        </div>
    )
}

export default Login;