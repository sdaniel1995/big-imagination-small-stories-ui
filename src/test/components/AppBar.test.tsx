import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import AppBar from "../../components/AppBar";


const setComponent = jest.fn();

afterEach(cleanup);

describe('AppBar', () => { 
    test("renders correct text", () => {
        render(<AppBar setComponent={setComponent}/>);
        expect(screen.getByText("Big Imagination Small Stories.")).toBeInTheDocument();
        expect(screen.getByText("Collections")).toBeInTheDocument();
        expect(screen.getByText("Upload")).toBeInTheDocument();
        expect(screen.getByText("About Me")).toBeInTheDocument();
    });
});

describe("AppBar functionality", () => {
    test("calls setComponet function on Collections click", () => {
        render(<AppBar setComponent={setComponent}/>);
        fireEvent.click(screen.getByText("Collections"));
        expect(setComponent).toBeCalledTimes(1);
    });

    test("calls setComponet function on Upload click", () => {
        render(<AppBar setComponent={setComponent}/>);
        fireEvent.click(screen.getByText("Upload"));
        expect(setComponent).toBeCalledTimes(1);
    });

    test("calls setComponet function on AboutMe click", () => {
        render(<AppBar setComponent={setComponent}/>);
        fireEvent.click(screen.getByText("About Me"));
        expect(setComponent).toBeCalledTimes(1);
    });
});