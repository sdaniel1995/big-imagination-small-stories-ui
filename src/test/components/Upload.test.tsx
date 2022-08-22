import { render, cleanup, fireEvent, act, within } from "@testing-library/react";
import axios from "axios";
import Upload from "../../components/Upload";


afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedData = [
    {
        "id": 1,
        "name": "Dusty Roads"
    },
    {
        "id": 2,
        "name": "The Revolver"
    },
    {
        "id": 3,
        "name": "The Revolver: 100 Black Coffin"
    },
];

describe("Upload", () => {
    test("renders correct components", () => {
        const { getByTestId, getByText } = render(<Upload />);
        expect(getByTestId("upload")).toContainElement(getByTestId("uploadForm"));
        expect(getByText("Series")).toBeInTheDocument();
        expect(getByTestId("upload")).toContainElement(getByTestId("seriesSelection"))
        expect(getByText("Chapter")).toBeInTheDocument();
        expect(getByTestId("upload")).toContainElement(getByTestId("chapterSelection"));
        expect(getByText("Description", { selector: "label" })).toBeInTheDocument();
        expect(getByTestId("upload")).toContainElement(getByTestId("submitBtn"));
    });

    test("render correct options for chapters selection", async () => {
        const { getByRole, getByText, getAllByRole } = render(<Upload />);
        const chapterSelection = getAllByRole("button")[1];
        await act(async () => {
            fireEvent.mouseDown(chapterSelection);
        });
        const listBox = within(getByRole("listbox"));
        const listBoxSize = listBox.getAllByRole("option");
        expect(listBoxSize).toHaveLength(10);
        for (let chapter = 1; chapter < listBoxSize.length; chapter++) {
            expect(getByText(`Chapter ${chapter}`)).toBeInTheDocument();
        };
    });

    test("should render correct options for series selection", async () => {
        // mock axios promise
        await act(async () => {
            mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedData));
            render(<Upload />);
        });
        expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/series");
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
});

describe("Upload functionality", () => {
    test("handleChange should change selected option for chapters selection", async () => {
        const { getByTestId, getByRole, getAllByRole } = render(<Upload />);
        const chapterSelection = getAllByRole("button")[1];
        expect(getByTestId("chapterSelection")).not.toHaveTextContent("Chapter 1");
        await act(async () => { // Makes chapter options visible for selection
            fireEvent.mouseDown(chapterSelection);
        });
        const chapterOptions = within(getByRole("listbox"));
        act(() => { fireEvent.click(chapterOptions.getByText("Chapter 1")); }); // Selects an option
        expect(getByTestId("chapterSelection")).toHaveTextContent("Chapter 1");
    });

    test("handleChange should change descritpion value", () => {
        const { getByRole } = render(<Upload />);
        const descriptionInput = getByRole("textbox", { name: "Description" }) as HTMLInputElement;
        expect(descriptionInput.value).toBe("");
        fireEvent.change(descriptionInput, { target: { value: "test description" } });
        expect(descriptionInput.value).toBe("test description");
    });

    test("test onSubmit call", async () => {
        const { getByTestId } = render(<Upload />);
        const submitBtn = getByTestId("submitBtn");
        fireEvent.click(submitBtn);
    });
})