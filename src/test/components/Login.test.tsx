import { cleanup, render, screen } from "@testing-library/react";
import Login from "../../components/Login";

afterEach(() => {
    cleanup();
});

describe('Login', () => {
    test("renders correct components", () => {
        const setShowWelcome = jest.fn()
        const { getByTestId } = render(<Login show={setShowWelcome} />)
        expect(screen.getByText("Log In")).toBeInTheDocument();
        expect(screen.getByText("User Name", { selector: "label"})).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("username"));
        expect(screen.getByText("Password", { selector: "label"})).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("password"));
        expect(screen.getByText("Forgot password?")).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("forgotPasswordBtn"));
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("loginBtn"));
        expect(screen.getByText("Continue as reader...")).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("continueAsReaderBtn"));
    });
});
