import { render, cleanup} from "@testing-library/react";
import HomePage from "../../components/HomePage";
import Collections from "../../components/Collections";
import Upload from "../../components/Upload";
import AboutMe from "../../components/AboutMe";

afterEach(cleanup);

describe("HomePage", () => {
    test("renders Collections component on home page", () => {
        const { getByTestId } = render(<HomePage component={<Collections />} />);
        expect(getByTestId("homepage")).toContainElement(getByTestId("collections"));
    });

    test("renders Upload component on home page", () => {
        const { getByTestId } = render(<HomePage component={<Upload />} />);
        expect(getByTestId("homepage")).toContainElement(getByTestId("upload"));
    });

    test("renders AboutMe component on home page", async () => {
        const { getByTestId } = await render(<HomePage component={<AboutMe />} />);
        expect(getByTestId("homepage")).toContainElement(getByTestId("aboutMe"));
    });
});