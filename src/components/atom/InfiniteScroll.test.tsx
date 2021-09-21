/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import InfiniteScroll from "./InfiniteScroll";

const intersectionObserverMock = () => ({
    observe: () => null,
    disconnect: () => null,
});
window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

test("infinite scroll", () => {
    const component = renderer.create(<InfiniteScroll />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});
