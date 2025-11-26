import { useEffect, useState } from "react";
import { fetchProducts } from "../Service/api";
export const useProducts = () => {
const [products, setProducts] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [categories, setCategories] = useState([]);


const loadProducts = async () => {
setLoading(true);
const data = await fetchProducts(page);
setProducts((prev) => [...prev, ...data.products]);
const uniqueCats = new Set(data.products.map((p) => p.category));
setCategories((prev) => [...new Set([...prev, ...uniqueCats])]);
setLoading(false);
};


useEffect(() => {
loadProducts();
}, [page]);


return { products, loading, categories, setPage };
};