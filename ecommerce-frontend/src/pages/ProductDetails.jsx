import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">
        ← Back
      </Link>

      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>

          <p className="text-primary fw-bold">
            {product.category.name}
          </p>

          <p>{product.description}</p>

          <h3 className="text-success">
            ₹{product.price.toLocaleString("en-IN")}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;