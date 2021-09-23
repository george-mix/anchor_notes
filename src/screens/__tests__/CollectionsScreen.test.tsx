import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import CollectionsScreen from "../CollectionsScreen";

test("collection name input appears on button press, disappears on close", () => {
  const { getByText, getByPlaceholderText, queryAllByText } = render(
    <CollectionsScreen />
  );

  const addCollectionButton = getByText("+");
  fireEvent.press(addCollectionButton);

  const input = getByPlaceholderText("Enter Collection Name");
  expect(input).toBeDefined();

  const closeButon = getByText("close");
  fireEvent.press(closeButon);

  const inputAfterClose = queryAllByText("Enter Collection Name");
  expect(inputAfterClose).toHaveLength(0);
});
