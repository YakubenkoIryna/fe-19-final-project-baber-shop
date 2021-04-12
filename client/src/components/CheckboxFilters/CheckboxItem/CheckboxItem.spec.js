import React from 'react';
import CheckboxItem from "./index";
import renderer from 'react-test-renderer';

test('CheckboxItem renders correctly', () => {
  const element = renderer
    .create(<CheckboxItem id={"id"} checked={false} name={"name"} type={"type"} onChange={() => {
    }}/>)
    .toJSON();
  expect(element).toMatchSnapshot();
});

