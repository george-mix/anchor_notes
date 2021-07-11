import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import CreateCollectionModal from "../CreateCollectionModal";

test("input does not allow empty strings", async () => {
  const setModalOpen = jest.fn();
  const { getByPlaceholderText, getByText } = await render(
    <CreateCollectionModal setModalOpen={setModalOpen} />
  );

  const input = getByPlaceholderText("Enter Collection Name");
  fireEvent.changeText(input, "");

  const createButton = getByText("Create");
  fireEvent.press(createButton);

  const error = getByText("Field should not be empty");
  expect(error).toBeDefined();
});
