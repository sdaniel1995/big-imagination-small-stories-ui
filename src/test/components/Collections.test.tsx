import { render, cleanup, screen } from "@testing-library/react";
import Collections from "../../components/Collections";

afterEach(cleanup);


describe("Collections", () => { 
    test("renders correct components", () => {
        render(<Collections />);
        expect(screen.getByText("Collections")).toBeInTheDocument();
    });
});