import React from "react";
import { shallow } from "enzyme";
import { NavigationContainer } from "@react-navigation/native";

import App from "../App";
import MainNavigator from "../src/navigation/MainNavigator";
import { Wrapper } from "../src/types/testTypes";

describe("App", () => {
  let wrapper: Wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("renders navigation container", () => {
    const container = wrapper.find(NavigationContainer);

    expect(container).toHaveLength(1);
  });

  it("renders navigation", () => {
    const navigator = wrapper.find(MainNavigator);

    expect(navigator).toHaveLength(1);
  });
});
