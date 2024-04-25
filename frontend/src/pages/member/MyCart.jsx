import React from "react";
import withBaseComponent from "../../hocs/withBaseComponent";

function MyCart(props) {
  return <div onClick={() => props.navigate("/")}>MyCart</div>;
}

export default withBaseComponent(MyCart);
