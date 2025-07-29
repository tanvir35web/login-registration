"use client";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateQuantity, removeFromCart, clearCart } from "@/features/auth/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-400px)] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center text-xl">
          Your cart is empty.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-400px)] py-8">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded ">
        <h1 className="text-3xl font-bold mb-16">Shopping Cart</h1>
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-6 border-b pb-4">
              <Image src={item.image} alt={item.title} width={100} height={100} className="rounded" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <div className="text-gray-600">Category: {item.category}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-lg">${item.price}</span>
                  <div className="flex items-center border rounded ml-4">
                    <button
                      className="px-2 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200"
                      onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: Math.max(1, item.quantity - 1) }))}
                    >-</button>
                    <input
                      type="text"
                      className="w-10 text-center border-none focus:ring-0"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="px-2 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200"
                      onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))}
                    >+</button>
                  </div>
                  <button
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >Remove</button>
                </div>
              </div>
              <div className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => dispatch(clearCart())}
          >Clear Cart</button>
          <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
          <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => router.push("/checkout")}
          >Checkout</button>
        </div>
      </div>
    </div>
  );
} 