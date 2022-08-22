import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Login from "../../components/Login";

const setShowWelcome = jest.fn()

afterEach(cleanup);

describe('Login', () => {
    test("renders correct components", () => {
        const { getByTestId } = render(<Login show={setShowWelcome} />)
        expect(screen.getByText("Log In")).toBeInTheDocument();
        expect(screen.getByText("User Name", { selector: "label" })).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("username"));
        expect(screen.getByText("Password", { selector: "label" })).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("password"));
        expect(screen.getByText("Forgot password?")).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("forgotPasswordBtn"));
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("loginBtn"));
        expect(screen.getByText("Continue as reader...")).toBeInTheDocument();
        expect(getByTestId("login")).toContainElement(getByTestId("continueAsReaderBtn"));
    });
});

describe("Login functionality", () => {
    test("test onSubmit call", async () => {
        const { getByTestId, getByRole, getByLabelText } = render(<Login show={setShowWelcome} />);
        const loginBtn = getByTestId("loginBtn");
        const username = getByRole("textbox", { name: "User Name" }) as HTMLInputElement;
        const password = getByLabelText("Password") as HTMLInputElement;
        await act(async () => {
            fireEvent.change(username, { target: { value: "test" } });
            fireEvent.change(password, { target: { value: "1234" } });
        })
        expect(username.value).toBe("test");
        expect(password.value).toBe("1234");
        await act(async () => {
            fireEvent.click(loginBtn);
        })
    });

    test("correct error messages should show when username and password are empty on submit", async () => {
        const { getByTestId } = render(<Login show={setShowWelcome} />);
        const loginBtn = getByTestId("loginBtn");
        await act(async () => {
            fireEvent.click(loginBtn);
        })
        expect(screen.getByText("Username is required")).toBeInTheDocument();
        expect(screen.getByText("Password is required")).toBeInTheDocument();
    });

    test("correct error message should show when password fails validations", async () => {
        const { getByLabelText } = render(<Login show={setShowWelcome} />);
        const password = getByLabelText("Password") as HTMLInputElement;
        await act(async () => {
            fireEvent.change(password, { target: { value: "123456789" } });
        })
        expect(screen.getByText("Password must be less than 9 characters")).toBeInTheDocument();
    });
});
