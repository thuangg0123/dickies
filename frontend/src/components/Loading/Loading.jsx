import React, { memo } from "react";
import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div>
      <ClipLoader color="black" />
    </div>
  );
}

export default memo(Loading);
