import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/features/auth/cartSlice";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
};

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div
      key={product._id}
      className="group border-[1px] shadow-sm relative rounded-xl p-2 "
    >
      <div
        onClick={() => router.push(`/product/${product._id}`)}
        className="w-full h-[400px] overflow-hidden rounded-md  cursor-pointer "
      >
        <Image
          className="w-full h-full object-cover  group-hover:scale-110 duration-500 "
          src={product.image}
          alt="product Image"
          width={200}
          height={400}
        />
      </div>

      <div className="w-full h-[60px] px-2 py-4 flex justify-between">
        <div>
          <h2 className="text-base font-semibold">
            {product.title.substring(0, 15)}
          </h2>
        </div>
        <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
          <div className="flex flex-row gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
            <p className="line-through text-gray-500">$ {product.oldPrice}</p>
            <p className="font-semibold">$ {product.price}</p>
          </div>
          <p
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1,
              }));
              toast.success("Added to cart!");
            }}
            className="absolute z-20 w-[100] bg-amber-200 text-black font-medium p-1 justify-center rounded-md flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500 "
          >
            add to cart
            <span><FaArrowRight /></span>
          </p>
        </div>
      </div>
      <div className="text-base mx-2 my-1">{product.category}</div>
      <div className="absolute top-4 right-0 pr-2">
        {product.isNew && (
          <p className="bg-black text-white font-semibold px-6 py-1">sale</p>
        )}
      </div>
    </div>
  );
};


export default ProductCard;