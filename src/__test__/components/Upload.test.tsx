import { render, cleanup, fireEvent, act, within, waitFor } from "@testing-library/react";
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

    test("should render correct options for series selection", async () => {
        mockedAxios.get.mockResolvedValue({data: mockedData});
        const { getAllByRole, getByRole, getByText } = render(<Upload />);
        expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/series");
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        const seriesSelection = getAllByRole("button")[0];
        await act(async () => {
            fireEvent.mouseDown(seriesSelection);
        });
        const listBox = within(getByRole("listbox"));
        const listBoxSize = await waitFor(() => listBox.getAllByRole("option"));
        expect(listBoxSize.length).toBe(3);
        for (let index = 0; index < listBoxSize.length; index++) {
            expect(getByText(mockedData[0].name)).toBeInTheDocument()
        };
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
});

describe("Upload functionality", () => {
    test("handleChange should change selected option for series selection", async () => {
        mockedAxios.get.mockResolvedValue({data: mockedData});
        const { getAllByRole, getByRole, getByTestId } = render(<Upload />);
        expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8080/api/series");
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        const seriesSelection = getAllByRole("button")[0];
        expect(getByTestId("seriesSelection")).not.toHaveTextContent("Chapter 1");
        await act(async () => { // Makes chapter options visible for selection
            fireEvent.mouseDown(seriesSelection);
        });
        const seriesOptions = await waitFor(() => within(getByRole("listbox")));
        act(() => { fireEvent.click(seriesOptions.getByText("Dusty Roads")); }); // Selects an option
        expect(getByTestId("seriesSelection")).toHaveTextContent("Dusty Roads");
    });

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