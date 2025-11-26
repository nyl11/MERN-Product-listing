export const fetchProducts = async (page) => {
const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${(page - 1) * 20}`);
return res.json();
};