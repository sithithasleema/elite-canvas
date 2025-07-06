"use client";

import Container from "@/app/components/Container";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { useCallback, useEffect, useState } from "react";

import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import { useCart } from "@/hooks/useCart";
import SetStyleSize from "@/app/components/products/SetStyleSize";
import { useRouter } from "next/navigation";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedStyle: string;
  selectedSize: string;
  quantity: number;
  price: number;
  images?: {
    color: string;
    colorCode: string;
    image: string;
  }[];
};

// const Horizontal = () => {
//   return <div className="w-[30%] mt-2"></div>;
// };

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  // Cart Initial State
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedStyle: "",
    selectedSize: "",
    quantity: 1,
    price: product.price,
  });

  console.log(cartProducts);
  useEffect(() => {
    if (
      !cartProducts ||
      !cartProduct.selectedStyle ||
      !cartProduct.selectedSize
    ) {
      setIsProductInCart(false);
      return;
    }

    const exists = cartProducts.some(
      (item) =>
        item.id === cartProduct.id &&
        item.selectedStyle === cartProduct.selectedStyle &&
        item.selectedSize === cartProduct.selectedSize
    );

    if (exists !== isProductInCart) {
      setIsProductInCart(exists); // only update if changed
    }
  }, [cartProducts, cartProduct, isProductInCart]);

  // Handling Style and Size Changes
  const handleChange = useCallback(
    (field: "selectedStyle" | "selectedSize", value: string) => {
      if (field === "selectedStyle") {
        setCartProduct((prev) => ({
          ...prev,
          selectedStyle: value,
          selectedSize: "",
        }));
      } else {
        setCartProduct((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    },
    []
  );

  // Handling Quantity Changes
  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, []);
  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      const newQty = Math.max(1, prev.quantity - 1); // prevent going below 1
      return { ...prev, quantity: newQty };
    });
  }, []);

  // Calculating Reviews Average
  const productRatingAverage =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, curr: { rating: number }) => acc + curr.rating,
          0
        ) / product.reviews.length
      : 0;

  // const handleStyleSelect = useCallback((value: string) => {
  //   setCartProduct((prev) => {
  //     return { ...prev, selectedImg: value };
  //   });
  // }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className=" max-h-[500px]">
          <ProductImage product={product} />
        </div>
        <div className=" flex flex-col gap-1 text-slate-700">
          <div className="p-4">
            <h2 className="text-lg md:text-xl font-medium">{product.name}</h2>

            <span className="text-sm">Elite Canvas Australia</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm px-4">
            <Rating
              value={productRatingAverage}
              readOnly
              precision={0.5}
              size="small"
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Link href="/">
              <span className="text-green-900 underline">
                {product.reviews.length} reviews
              </span>
            </Link>
          </div>

          {/* {Price} */}
          <div className="mt-3 px-4">
            <h1 className="old-price">{formatPrice(product.price)}</h1>
            <h2 className="new-price">$49.00</h2>
          </div>

          {/* Selecting Style and Size */}
          <SetStyleSize
            options={product.options}
            cartProduct={cartProduct}
            handleChange={handleChange}
          />

          {/* Quantity Selector */}
          <SetQuantity
            cartProduct={cartProduct}
            handleQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
          />

          {/* Category */}
          <div className="mt-3">
            <span className="font-semibold text-md mr-2">Category:</span>
            <span>{product.category}</span>
          </div>

          {/* Stock */}

          <div className={product.inStock ? "text-green-700" : "text-red-900"}>
            {product.inStock ? "Available" : "Out Of Stock"}
          </div>

          {isProductInCart ? (
            <>
              {" "}
              {/* View Cart Button */}
              <div className="mt-3 text-center">
                <Button
                  label="View Cart"
                  outline
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
                <p className="flex gap-2 items-center text-green-800 mt-4">
                  <MdCheckCircle />
                  <span>Product added to cart.</span>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Add to Cart Button */}
              <div className="mt-3 text-center">
                <Button
                  label="Add To Cart"
                  custom
                  onClick={() => handleAddProductToCart(cartProduct)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
