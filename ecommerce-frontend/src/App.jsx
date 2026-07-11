import { useEffect, useState } from "react";
import "./App.css";
import { getProducts, getCategories } from "./services/api";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  Promise.all([getProducts(), getCategories()])
    .then(([productsData, categoriesData]) => {
      setProducts(productsData);
      setCategories(categoriesData);
    })
    .catch(() => {
      setError("Unable to load products. Please try again later.");
    })
    .finally(() => setLoading(false));
}, []);
const handleCategorySelect = (categoryId) => {
  setSelectedCategory(categoryId ? Number(categoryId) : null);
};
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};
const handleSortChange = (event) => {
  setSortOrder(event.target.value);
};
const filteredProducts = products
  .filter((product) => {
    return (
      (selectedCategory ? product.category.id === selectedCategory : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })
  .sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
if (error) {
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h4>{error}</h4>
      </div>
      <Footer />
    </>
  );
}
if (loading) {
  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h4>Loading...</h4>
      </div>
      <Footer />
    </>
  );
}
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />

          <div className="container">
            <h1 className="my-4 text-center">Product Catalog</h1>

            <div className="row align-items-center mb-4">
              <div className="col-md-3">
                <CategoryFilter
                  categories={categories}
                  onSelect={handleCategorySelect}
                />
              </div>

              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  onChange={handleSearchChange}
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-control"
                  onChange={handleSortChange}
                >
                  <option value="asc">Sort by Price: Low to High</option>
                  <option value="desc">Sort by Price: High to Low</option>
                </select>
              </div>
            </div>

            <hr />

            {filteredProducts.length ? (
              <ProductList products={filteredProducts} />
            ) : (
              <div className="text-center mt-5">
                <h4>No Products Found</h4>
                <p className="text-muted">
                  Try a different search or category.
                </p>
              </div>
            )}
          </div>

          <Footer />
        </>
      } />

      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;