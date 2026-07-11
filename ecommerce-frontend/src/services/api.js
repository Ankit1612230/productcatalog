const BASE_URL = "http://localhost:8080/api";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  return response.json();
}

export async function getProductsByCategory(categoryId) {
  const response = await fetch(`${BASE_URL}/products/category/${categoryId}`);
  return response.json();
}
export async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return response.json();
}