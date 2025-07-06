"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter();

  const productRatingAverage =
    data.reviews.length > 0
      ? data.reviews.reduce(
          (acc: number, curr: { rating: number }) => acc + curr.rating,
          0
        ) / data.reviews.length
      : 0;
  return (
    //   ProductCard
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-slate-200 bg-canvas rounded-sm p-4 transition hover:scale-105"
    >
      {/* Content inside Product card */}
      <div className="flex flex-col items-center">
        {/* Image container */}
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.images[0].image}
            alt={data.name}
            className="w-full h-full object-contain"
          ></Image>
        </div>

        {/* Product Name */}
        <div className="w-full mt-4 overflow-hidden">
          <h2 className="truncate text-center">{data.name}</h2>
        </div>

        {/* Rating */}
        <div className="text-center mt-2">
          <Rating
            value={productRatingAverage}
            precision={0.5}
            readOnly
            size="small"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <p> {data.reviews.length} reviews</p>
        </div>

        {/* Price */}
        <div className="font-semibold text-md mt-4">
          {formatPrice(data.price)} AUD
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
