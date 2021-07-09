import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import CollectionsScreen from "../CollectionsScreen";

test("collection name input appears on button press", () => {
  const { getByText, getByPlaceholderText } = render(<CollectionsScreen />);
  const button = getByText("+");
  fireEvent.press(button);

  const input = getByPlaceholderText("Enter Collection Name");
  expect(input).toBeDefined();
});
