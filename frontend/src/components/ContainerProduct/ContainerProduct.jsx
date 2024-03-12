import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductByGender } from "../../store/products/asyncActions";

function ContainerProduct({ gender }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByGender({ gender }));
  }, [dispatch, gender]);

  return (
    <div>
      <div>hi {gender}</div>
    </div>
  );
}

export default ContainerProduct;
