import React from "react";
import { render } from "@testing-library/react-native";

import CollectionList from "../CollectionList";

jest.mock("../../../utils/functions/collectionFunctions", () => {
  return {
    getCollectionList: jest.fn().mockImplementation(() => [
      { id: 1, name: "Mocked Name" },
      { id: 2, name: "Mocked Name 2" },
    ]),
  };
});

test("", () => {
  const { queryAllByText } = render(<CollectionList />);
  const dsf = queryAllByText("Mocked Name");

  expect(dsf).toHaveLength(1);
});
