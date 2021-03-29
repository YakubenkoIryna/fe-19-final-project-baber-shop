// Create-Form Schema and controls rules
const rules = [{required: true, message: 'field is required'}];

export const fieldsSetArr = [
  ['input', {label: "Category Name", name: "name", rules}],
  ['input', {label: "Category Description", name: "description", rules}],
]

// form layout settings
export const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
export const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};

