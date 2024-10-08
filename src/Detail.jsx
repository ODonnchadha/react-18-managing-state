import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useCart } from "./cartContext";

export default function Detail() {
  const { dispatch } = useCart();
  // Destructure the id from the route parameter.
  const { id } = useParams();

  // Used for redirection. 
  // Note the root: navigate("/cart") so that we remove the existing parameters.
  const navigate = useNavigate();

  // Declare some state called size and a function that sets size.
  // Default size to an empty string. Array destructuring.
  // setSku setter within onChange event handler.
  const [sku, setSku] = useState("");
  // const state = useState('');
  // const sku = state[0];
  // const setSku = state[1];

  // Leveraging the custom fetch hook with id.
  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  // If there is not a product after loading, display the 404 page.
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>

      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: "add", id, sku });
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
