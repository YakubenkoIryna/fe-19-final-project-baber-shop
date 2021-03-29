import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {act} from '@testing-library/react'
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store'
import UserInformation from "./index";


let container = null;
const initialState = {output:10}
const mockStore = configureStore()
let store

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

test('UserInformation is rendered true', () => {
    store = mockStore(initialState)
    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserInformation/>
                </MemoryRouter>
            </Provider>, container)
    });

    expect(container.innerHTML).toMatchSnapshot();
});


test("UserInformation confirm button called Submit", () => {
    store = mockStore(initialState)
    act(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserInformation/>
                </MemoryRouter>
            </Provider>, container)
    });

    const text = document.querySelector("button > span");
    console.log(text.innerHTML)
    expect(text.innerHTML).toBe("Submit");

});