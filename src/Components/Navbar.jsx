import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { ThemeContext } from "../Context/ThemeContext";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <nav className="p-4 flex justify-between items-center shadow bg-gray-200 dark:bg-gray-900 dark:text-white">
      <h1 
        onClick={() => navigate("/")} 
        className="text-xl font-bold cursor-pointer"
      >
        Task
      </h1>

      <div className="flex items-center gap-6">

        {/* Theme Switch */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-full font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Cart Icon */}
        <div 
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={28} className="text-gray-700 dark:text-white" />

          {/* Cart Badge */}
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>

      </div>
    </nav>
  );
}
