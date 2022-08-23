import { cleanup, render, fireEvent, act } from "@testing-library/react";
import App from "../../components/App"


afterEach(cleanup);

describe("App", () => {
    test("renders login component", () => {
        const { queryByTestId } = render(<App />);
        expect(queryByTestId("login")).toBeTruthy();
        expect(queryByTestId("welcome")).toBeNull();
        expect(queryByTestId("appBar")).toBeNull();
        expect(queryByTestId("homepage")).toBeNull();
    });

    test("renders welcome component", () => {
        const { queryByTestId, getByText } = render(<App />);
        expect(queryByTestId("login")).toBeTruthy();
        expect(queryByTestId("welcome")).toBeNull();
        fireEvent.click(getByText("Continue as reader..."));
        expect(queryByTestId("welcome")).toBeTruthy();
        expect(getByText("This is Where the Story Begins...")).toBeInTheDocument();
    });

    test("renders AppBar and HomePage component", () => {
        jest.useFakeTimers();
        const { queryByTestId, getByText } = render(<App />);
        expect(queryByTestId("login")).toBeTruthy();
        expect(queryByTestId("welcome")).toBeNull();
        expect(queryByTestId("appBar")).toBeNull();
        expect(queryByTestId("homepage")).toBeNull();
        fireEvent.click(getByText("Continue as reader..."));
        act(() => {
            jest.advanceTimersByTime(5500);
        })
        expect(queryByTestId("welcome")).toBeNull();
        expect(queryByTestId("appBar")).toBeTruthy();
        expect(queryByTestId("homepage")).toBeTruthy();
    });
});