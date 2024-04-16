import React, { memo } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";

const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

const formatCategory = (category) => {
  return category
    ? category
        .split("-")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ")
    : "";
};

function Breadcrum({ gender, category, title, product }) {
  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/products", breadcrumb: product },
    {
      path: "/products/:gender",
      breadcrumb: `${capitalizeFirstLetter(gender)}'clothing`,
    },
    {
      path: "/products/:gender/:category",
      breadcrumb: formatCategory(category),
    },
    { path: "/products/:gender/:category/:title", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <>
      {breadcrumbs
        ?.filter((element) => !element.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link key={match.pathname} to={match.pathname}>
            {breadcrumb}&nbsp;
            {index !== self.length - 1 && "/"}
            &nbsp;
          </Link>
        ))}
    </>
  );
}

export default memo(Breadcrum);
