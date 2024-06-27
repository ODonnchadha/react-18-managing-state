import React from "react";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";

export default function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data : product, loading, error } = useFetch(`products/${id}`);

    if (error) throw error;
    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />;

    return (
        <>
            <div id="detail">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p id="price">${product.price}</p>
                <p>
                    <button className="btn btn-primary" onClick={(() => navigate("/cart"))}>
                        Add to cart
                    </button>
                </p>
                <img src={`/images/${product.image}`} alt={product.category} />
            </div>
        </>
    );
}
