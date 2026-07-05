import { useEffect, useState } from "react";
import { getProducts } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  getProducts()
    .then((data) => {
      console.log(data);
      setProducts(data);
    })
    .catch((error) => console.error(error));
}, []);

  return (
    <div>
      <h1>E-Commerce Store</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;