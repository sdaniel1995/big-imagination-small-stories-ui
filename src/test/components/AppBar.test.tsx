import { render, cleanup, fireEvent } from "@testing-library/react";
import AppBar from "../../components/AppBar";


const setComponent = jest.fn();

afterEach(cleanup);

describe('AppBar', () => { 
    test("renders correct text", () => {
        const { getByText } = render(<AppBar setComponent={setComponent}/>);
        expect(getByText("Big Imagination Small Stories.")).toBeInTheDocument();
        expect(getByText("Collections")).toBeInTheDocument();
        expect(getByText("Upload")).toBeInTheDocument();
        expect(getByText("About Me")).toBeInTheDocument();
    });
});

describe("AppBar functionality", () => {
    test("calls setComponet function on Collections click", () => {
        const { getByText } = render(<AppBar setComponent={setComponent}/>);
        fireEvent.click(getByText("Collections"));
        expect(setComponent).toBeCalledTimes(1);
    });

    test("calls setComponet function on Upload click", () => {
        const { getByText } = render(<AppBar setComponent={setComponent}/>);
        fireEvent.click(getByText("Upload"));
        expect(setComponent).toBeCalledTimes(1);
    });

    test("calls setComponet function on AboutMe click", () => {
        const { getByText } = render(<AppBar setComponent={setComponent}/>);
        fireEvent.click(getByText("About Me"));
        expect(setComponent).toBeCalledTimes(1);
    });
});