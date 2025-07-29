"use client";
import ProductCard from "@/app/components/product/ProductCard";
import { useGetProductsQuery } from "@/features/api/authApi";

export default function Home() {
  const { data, isLoading } = useGetProductsQuery({});

  if (isLoading)
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );

  return (
    <>
      <div className="max-w-screen-xl min-h-screen mx-auto py-10 grid lg:grid-cols-4 gap-10 sm:grid-cols-2 w-11/12 ">
        {data &&
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
}
