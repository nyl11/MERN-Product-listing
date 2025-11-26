import { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useProducts } from "../Hooks/useProducts";
import { Search } from "lucide-react";

export default function Home() {
  const { products, loading, categories, setPage } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300 &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="dark:bg-gray-900 min-h-screen pb-10">

      <div className="flex flex-wrap justify-between items-center gap-4 p-4">
  {/* Search Bar */}
     <div className="relative w-96">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
    <input
      type="text"
      value={search}
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Filters */}
  <div className="flex gap-4">
    <select
      className="p-2 rounded dark:bg-gray-700 dark:text-white bg-gray-200"
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((c, index) => (
        <option key={c + "-" + index} value={c}>
          {c}
        </option>
      ))}
    </select>

    <select
      className="p-2 rounded dark:bg-gray-700 dark:text-white bg-gray-200"
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Rating</option>
    </select>
  </div>
</div>
      {/* Products info */}
      <div className="px-4 pb-2 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filtered.length} of {products.length} products
        </p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
          {filtered.map((p, index) => (
            <ProductCard key={p.id + "-" + index} product={p} />
          ))}
        </div>
      </div>

      {loading && <p className="text-center text-white py-6">Loading...</p>}
    </div>
  );
}
