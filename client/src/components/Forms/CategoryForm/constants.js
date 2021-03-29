// Create-Form Schema and controls rules

const rules = [{ required: true, message: "field is required" }];

export const fieldsSetArr = [
  ["select-level", { label: "Level", name: "level", rules }],
  ["select-parentCategory", { label: "Parent ID", name: "parentId", rules }],
  ["input", { label: "Category ID", name: "id", rules }],
  ["input", { label: "Category Name", name: "name", rules }],
  ["input", { label: "Category Description", name: "description", rules }]
];

// form layout settings
export const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

export const tailLayout = {
  wrapperCol: {
    span: 24
  }
};

export const initialFormValues = {
  id: "",
  name: "",
  description: "",
};

export const rootCloudinaryFolderName = 'categories';

