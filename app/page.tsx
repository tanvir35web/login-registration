"use client";
import { useGetProductsQuery } from "@/features/api/authApi";
import ProductCard from "./components/product/ProductCard";
import { Header } from "./components/Header/Header";

export default function Home() {
  const { data, isLoading } = useGetProductsQuery({});

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading ...</div>;
  console.log(data);

  return (
    <>
    <Header />
    <div className="max-w-screen-xl mx-auto py-10 grid lg:grid-cols-4 gap-10 sm:grid-cols-2 w-11/12 ">
      {data &&
        data.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
    </>
    
  );
}
