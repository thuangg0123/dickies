import React, { memo, useEffect, useState } from "react";
import usePagination from "../../hooks/usePagination";
import PagiItem from "../Pagination/PagiItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [] = useState();
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, params.get("page") || 1);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +import.meta.env.VITE_APP_LIMIT || 10;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <>
      <div className="flex w-full items-center justify-between">
        {!+params.get("page") && (
          <span className="text-sm font-semibold">{`Show products 1 - ${
            Math.min(+import.meta.env.VITE_APP_LIMIT, totalCount) || 10
          } of ${totalCount}`}</span>
        )}
        {+params.get("page") && (
          <span className="text-sm font-semibold">{`Show products ${range()} of ${totalCount}`}</span>
        )}
        <div className="flex items-center gap-4">
          {pagination?.map((element) => (
            <PagiItem key={element}>{element}</PagiItem>
          ))}
        </div>
      </div>
    </>
  );
};
export default memo(Pagination);
