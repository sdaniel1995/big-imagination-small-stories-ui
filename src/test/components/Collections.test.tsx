import { render, cleanup } from "@testing-library/react";
import Collections from "../../components/Collections";

afterEach(cleanup);


describe("Collections", () => { 
    test("renders correct components", () => {
        const { getByText } = render(<Collections />);
        expect(getByText("Collections")).toBeInTheDocument();
    });
});