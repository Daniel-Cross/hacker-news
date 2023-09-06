import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Linking, Share } from "react-native";
import NewsItem from "../../components/NewsItem";
import { NewsItemProps } from "../../store/types";

jest.mock("react-native/Libraries/Share/Share", () => ({
  share: jest.fn(),
}));

global.alert = jest.fn();

describe("NewsItem", () => {
  const props: NewsItemProps = {
    title: "Test Title",
    score: 10,
    url: "https://example.com",
    time: 123456789,
    by: "Test User",
    karma: 100,
    descendants: 0,
    id: 123,
    kids: [],
    type: "story",
  };

  it("renders correctly", () => {
    const { getByText } = render(<NewsItem {...props} />);
    expect(getByText(props.title)).toBeDefined();
    expect(getByText(`by: ${props.by}`)).toBeDefined();
    expect(getByText(props.score.toString())).toBeDefined();
  });

  it("opens the URL when the link button is pressed", () => {
    const { getByTestId } = render(<NewsItem {...props} />);
    const linkButton = getByTestId("link-button");
    fireEvent.press(linkButton);
    expect(Linking.openURL).toHaveBeenCalledWith(props.url);
  });

  it("shares the URL when the share button is pressed", () => {
    // Mock the Share.share function to throw an error
    (Share.share as jest.Mock).mockImplementation(() => {
      throw new Error("Test error message");
    });

    const { getByTestId } = render(<NewsItem {...props} />);
    const shareButton = getByTestId("share-button");
    fireEvent.press(shareButton);

    // Expect that alert is called with the error message
    expect(global.alert).toHaveBeenCalledWith("Test error message");
  });
});
