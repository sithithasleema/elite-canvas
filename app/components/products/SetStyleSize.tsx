"use client";

export const typeSizeMap = {
  stretched: ["20x30cm", "30x40cm", "60x90cm", "90x120cm"],
  floating: ["20x30cm", "30x40cm", "60x90cm"],
  framedPhoto: ["A4", "A3", "A2"],
};

interface OptionType {
  value: string;
  label: string;
}

interface SetStyleSizeProps {
  options: OptionType[];
  cartProduct: {
    selectedStyle: string;
    selectedSize: string;
  };
  handleChange: (
    field: "selectedStyle" | "selectedSize",
    value: string
  ) => void;
}

const SetStyleSize = ({
  options,
  cartProduct,
  handleChange,
}: SetStyleSizeProps) => {
  const sizes = typeSizeMap[cartProduct.selectedStyle] || [];
  return (
    <div>
      {" "}
      {/* Conditionally rendering sizes */}
      <div className="mt-3">
        <fieldset className="border p-4 rounded-md border-gray-200 mt-3">
          <legend className="font-semibold"> Select Product Type</legend>
          <div className="flex gap-4">
            {options.map((option) => (
              <label
                key={option.value}
                className="cursor-pointer relative flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="productType"
                  value={option.value}
                  className="sr-only peer"
                  checked={cartProduct.selectedStyle === option.value}
                  onChange={() => handleChange("selectedStyle", option.value)}
                  required
                />
                <div className="px-4 py-2 border rounded-md peer-checked:bg-background peer-checked:text-white transition">
                  {option.label}
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Size Options */}
        {sizes.length > 0 && (
          <fieldset className="border p-4 rounded-md border-gray-200 mt-3">
            <legend className="font-semibold">Choose Size</legend>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <label
                  htmlFor={size}
                  key={size}
                  className="cursor-pointer relative flex items-center gap-2"
                >
                  <input
                    type="radio"
                    id={size}
                    name="canvasSize"
                    value={size}
                    checked={cartProduct.selectedSize === size}
                    onChange={() => handleChange("selectedSize", size)}
                    className="sr-only peer "
                    required
                  />
                  <div className="px-4 py-2 border rounded-md peer-checked:bg-background peer-checked:text-white transition">
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default SetStyleSize;
