import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const IndicateurDeChargement = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    )
  );
};

export default IndicateurDeChargement;
