import React from 'react'
import UnsubscriptionPage from './index'
import MailService from '../../services/MailService'
import {render, unmountComponentAtNode} from 'react-dom'
import {act} from '@testing-library/react'

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

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'localhost:3000/example/path',
    }),
}));

test('UnsubscriptionPage is rendered true', async () => {
    jest.spyOn(MailService, 'unsubscribe').mockImplementation(() =>
        Promise.resolve(true)
    );

    await act(async () => {
        await render(<UnsubscriptionPage/>, container);
    });

    expect(container.innerHTML).toMatchSnapshot();

    MailService.unsubscribe.mockRestore();
})

test('UnsubscriptionPage is rendered false', async () => {
    jest.spyOn(MailService, 'unsubscribe').mockImplementation(() =>
        Promise.resolve(false)
    );

    await act(async () => {
        await render(<UnsubscriptionPage/>, container);
    });

    expect(container.innerHTML).toMatchSnapshot();

    MailService.unsubscribe.mockRestore();
})
