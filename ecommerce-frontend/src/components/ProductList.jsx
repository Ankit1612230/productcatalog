const ProductList = ({ products }) => {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
          <div className="card h-100 shadow-sm">

            <img
              src={product.imageUrl || "https://placehold.co/600x400"}
              className="card-img-top"
              alt={product.name}
            />

            <div className="card-body d-flex flex-column">

              <h5 className="card-title">{product.name}</h5>

              <p className="text-primary fw-semibold mb-2">
                {product.category.name}
              </p>

              <p className="card-text text-muted">
                {product.description}
              </p>

              <h5 className="text-success mt-auto">
                ₹{product.price.toLocaleString("en-IN")}
              </h5>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;