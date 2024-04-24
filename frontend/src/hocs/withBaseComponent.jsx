import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const withBaseComponent = (Component) => (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Component
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      location={location}
    />
  );
};

export default withBaseComponent;
