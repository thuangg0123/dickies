import React, { memo } from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) {
      param.push(i);
    }
    const queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    if (Number(children)) {
      queries.page = children;
    }
    navigate({
      pathname: "/products",
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      className={clsx(
        "flex justify-center bg-black text-white p-4 w-10 h-10 border-2 border-black",
        !Number(children) && "items-end pb-2",
        Number(children) &&
          "items-center hover:bg-white hover:text-black transition-all",
        +params.get("page") === +children && "bg-slate-500",
        !+params.get("page") && children === 1 && "bg-slate-500"
      )}
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PagiItem);
