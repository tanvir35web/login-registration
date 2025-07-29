"use client";
import { useGetProductByIdQuery } from "@/features/api/authApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/auth/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load product.</div>;
  if (!data) return <div>Product not found.</div>;
  const product = data.product;

  // Placeholder values for stars and reviews
  const stars = 5;
  const reviewCount = 217;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-lg  overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100 relative">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg object-cover max-h-[600px] w-full"
          />
          {product.isNew && (
            <span className="absolute top-4 right-4 bg-black text-white px-4 py-1 rounded-full text-sm font-bold">Sale</span>
          )}
        </div>
        {/* Info Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-6">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            {product.oldPrice && (
              <span className="text-2xl text-gray-400 line-through">$ {product.oldPrice}</span>
            )}
            <span className="text-2xl font-bold text-black">$ {product.price}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: stars }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" /></svg>
            ))}
            <span className="text-gray-500 text-sm">({reviewCount} customer review)</span>
          </div>
          <p className="text-gray-600 mb-6">
            {product.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam."}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="font-medium">Quantity</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >-</button>
              <input
                id="quantity"
                type="text"
                className="w-12 text-center border-none focus:ring-0"
                value={quantity}
                readOnly
              />
              <button
                className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200"
                onClick={() => setQuantity(q => q + 1)}
              >+</button>
            </div>
            <button
              className="ml-4 px-6 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition"
              onClick={() => {
                dispatch(addToCart({
                  _id: product._id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  quantity,
                }));
                toast.success("Added to cart!");
              }}
            >
              Add item
            </button>
          </div>
          <div className="text-lg text-gray-700">Category: <span className="font-bold">{product.category}</span></div>
        </div>
      </div>
    </div>
  );
} 