// FilterProduct.jsx
import React from "react";

function FilterProduct({ setIsShow }) {
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white z-50">
      <button onClick={() => setIsShow(false)}>Close</button>
      {/* Nội dung của sidebar lọc */}
    </div>
  );
}

export default FilterProduct;
