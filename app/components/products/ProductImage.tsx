"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  product: any;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const [selectedImg, setSelectedImg] = useState(product.images[0].image);
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] overflow-y-scroll no-scrollbar">
        {product.images.map((image) => {
          return (
            <div
              key={image.color}
              onClick={() => setSelectedImg(image.image)}
              className={`relative w-[80%] aspect-square rounded border-2 transition 
              ${
                selectedImg === image.image
                  ? "border-secondary"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain p-1"
              />
            </div>
          );
        })}
      </div>
      <div className="relative col-span-5 flex justify-center items-center ">
        <Image
          src={selectedImg}
          alt="Selected Image"
          fill
          className="object-contain p-8"
        />
      </div>
    </div>
  );
};

export default ProductImage;
