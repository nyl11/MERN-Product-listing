import { motion } from "framer-motion";
import { useContext } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { CartContext } from "../Context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
      className="m-5 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 p-2">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-md" 
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Title */}
        <h2 className="font-semibold text-base dark:text-white mb-2 line-clamp-2 h-12">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium dark:text-white">{product.rating?.toFixed(1) || "N/A"}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviews?.length || 0})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </p>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
