import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Trash2 } from "lucide-react";


export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div className="dark:bg-gray-900 min-h-screen p-6">
        
      <h1 className="text-2xl font-bold dark:text-white mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    ${item.price}
                  </p>

                  {/* Quantity buttons */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQty(item.id, "dec")}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      -
                    </button>

                    <span className="dark:text-white">{item.qty}</span>

                    <button
                      onClick={() => updateQty(item.id, "inc")}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="text-right mt-6">
            <h2 className="text-xl font-bold dark:text-white">
              Total: ${total.toFixed(2)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
