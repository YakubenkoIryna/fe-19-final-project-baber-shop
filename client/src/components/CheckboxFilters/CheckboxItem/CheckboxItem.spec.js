import React from 'react';
import CheckboxItem from "./index";
import renderer from 'react-test-renderer';

test('CheckboxItem renders correctly', () => {
    const tree = renderer
        .create(<CheckboxItem id={"id"} checked={false} name={"name"} type={"type"} onChange={() => {}}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

