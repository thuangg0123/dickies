import React, { memo } from "react";
import usePagination from "../../hooks/usePagination";
import PagiItem from "../Pagination/PagiItem";

const Pagination = ({ totalCount }) => {
  const pagination = usePagination(66, 2);
  console.log(pagination);
  return (
    <>
      <div className="flex items-center">
        {pagination?.map((element) => (
          <PagiItem key={element}>{element}</PagiItem>
        ))}
      </div>
    </>
  );
};
export default memo(Pagination);
