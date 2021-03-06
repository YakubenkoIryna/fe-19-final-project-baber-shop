import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {act} from '@testing-library/react'
import OrderConfirmation from "./index";
import {MemoryRouter} from "react-router";

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

test('OrderConfirmation is rendered true', () => {
    act(() => {
        render(<MemoryRouter>
            <OrderConfirmation/>
        </MemoryRouter>, container)
    });

    expect(container.innerHTML).toMatchSnapshot();
})