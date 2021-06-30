import React from "react";
import { shallow } from "enzyme";

import { Wrapper, Screens } from "../../types/testTypes";
import MainNavigator, { Stack } from "../MainNavigator";
import NoteScreen from "../../screens/NoteScreen";
import CollectionsScreen from "../../screens/CollectionsScreen";
import TreeScreen from "../../screens/TreeScreen";

describe("MainNavigator", () => {
  let wrapper: Wrapper;
  let screens: Screens;

  beforeEach(() => {
    wrapper = shallow(<MainNavigator />);
    screens = wrapper.find(Stack.Screen);
  });

  it("renders stack navigator", () => {
    const navigator = wrapper.find(Stack.Navigator);

    expect(navigator).toHaveLength(1);
  });

  it("renders 3 screens", () => {
    expect(screens).toHaveLength(3);
  });

  it("renders a collection screen", () => {
    const noteScreen = screens.at(0);

    expect(noteScreen.prop("name")).toBe("Collections");
    expect(noteScreen.prop("component")).toBe(CollectionsScreen);
  });

  it("renders a tree screen", () => {
    const noteScreen = screens.at(1);

    expect(noteScreen.prop("name")).toBe("Tree");
    expect(noteScreen.prop("component")).toBe(TreeScreen);
  });

  it("renders a note screen", () => {
    const noteScreen = screens.at(2);

    expect(noteScreen.prop("name")).toBe("Note");
    expect(noteScreen.prop("component")).toBe(NoteScreen);
  });
});
