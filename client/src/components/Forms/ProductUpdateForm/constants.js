// Create-Form Schema and controls rules

const rules = [{ required: true, message: "field is required" }];

export const fieldsSetArr = [
  ["checkbox", { label: "Enabled", name: "enabled", className: "productPrice" }],
  ["input", { label: "Product Name", name: "name", rules, status: 'yes' }],
  ["number", { label: "Current price", name: "currentPrice", className: "productPrice", rules, status: 'yes' }],
  ["number", { label: "Quantity", name: "quantity", className: "productPrice", rules }],
  ["select-categories", { label: "Product Catalog", name: "categories_level1", rules, status: 'yes' }, 1],
  ["select-categories", { label: "Parent Product Category", name: "categories_parent", rules, status: 'yes' }, 2],
  ["select-categories", { label: "Product Category", name: "categories", rules, status: 'yes' }, 3],
  ["select-filter", { label: "Country", name: "country", rules, status: 'yes' }],
  ["select-filter", { label: "Brand", name: "brand", rules, status: 'yes' }],
  ["input", { label: "Product Description", name: "description" }],
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
  name: "",
  currentPrice: 0,
  quantity: 1,
  enabled: true,
  description: "",
};

export const rootCloudinaryFolderName = "products";

