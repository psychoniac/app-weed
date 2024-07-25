import { useEffect, useState } from "react";
import { getProducts } from '../services/productService';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };
    fetchProducts();
}, []);

return (
    <div className="container">
        <h1>Nos Variétés</h1>
        <div className="row">
            {products.map((product) => (
                <div key={product.id} className="col-md-4">
                    <div className="card mb-4">
                        <img src={product.photo} alt={product.name} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.type}</p>
                            <p className="card-text">{product.joursFlo}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default Products;