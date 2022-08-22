import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Upload from "../../components/Upload";

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe("Upload", () => {
    test("renders correct components", () => {
        const { getByTestId } = render(<Upload />);
        expect(getByTestId("upload")).toContainElement(getByTestId("uploadForm"));
        expect(screen.getByText("Series")).toBeInTheDocument();
        expect(getByTestId("upload")).toContainElement(getByTestId("seriesInput"))
        expect(screen.getByText("Chapter")).toBeInTheDocument();
        expect(getByTestId("upload")).toContainElement(getByTestId("chapterInput"));
        expect(screen.getByText("Description", { selector: "label" })).toBeInTheDocument();
        expect(getByTestId("upload")).toContainElement(getByTestId("submitBtn"));
    });

    test("test onSubmit call", () => {
        const { getByTestId } = render(<Upload />);
        const submitBtn = getByTestId("submitBtn");
        fireEvent.click(submitBtn);
    });
});