import React from "react";
import { shallow } from "enzyme";
import { NavigationContainer } from "@react-navigation/native";

import App from "../App";
import MainNavigator from "../src/navigation/MainNavigator";

describe("App", () => {
  it("renders navigation container", () => {
    const wrapper = shallow(<App />);
    const container = wrapper.find(NavigationContainer);

    expect(container).toHaveLength(1);
  });

  it("renders navigation", () => {
    const wrapper = shallow(<App />);
    const navigator = wrapper.find(MainNavigator);

    expect(navigator).toHaveLength(1);
  });
});
