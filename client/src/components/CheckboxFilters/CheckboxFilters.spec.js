import React from 'react';
import CheckboxFilter from "./index";
import {render, unmountComponentAtNode} from 'react-dom'
import {act} from '@testing-library/react'
import {MemoryRouter} from "react-router";
import renderer from "react-test-renderer";

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

test('CheckboxFilter is rendered', () => {
    act(() => {
        render(<MemoryRouter>
            <CheckboxFilter/>
        </MemoryRouter>, container)
    });

    expect(container.innerHTML).toMatchSnapshot();
});

test('renders correctly when there is one filter', () => {
    const items = ['filter'];
    const tree = renderer.create(<CheckboxFilter items={items} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders correctly when there are couple of filters', () => {
    const items = ['filter-one', 'filter-two', 'filter-three'];
    const tree = renderer.create(<CheckboxFilter items={items} />).toJSON();
    expect(tree).toMatchSnapshot();
});