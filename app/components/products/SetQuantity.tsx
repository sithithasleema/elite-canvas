"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded-sm";

const SetQuantity = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}: SetQuantityProps) => {
  return (
    <div className="mt-3">
      <fieldset className="border p-4 rounded-md border-gray-200 mt-3">
        {" "}
        <legend className="font-semibold">Select Quantity</legend>
        <div className="flex gap-4 items-center text-base">
          <button
            onClick={handleQtyDecrease}
            className={btnStyles}
            disabled={cartProduct.quantity === 1}
          >
            -
          </button>
          <div>{cartProduct.quantity}</div>
          <button onClick={handleQtyIncrease} className={btnStyles}>
            +
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default SetQuantity;
