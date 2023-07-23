import React, { useState, useEffect } from 'react';
import Loader from '../../components/loading/Loader';
import { ILoadingState } from "../../redux/slices/sliceLoader";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const GlobalLoader: React.FC = () => {
  const loading: ILoadingState = useSelector<RootState, ILoadingState>(state => state.loadingReducer);

  return (
    <div>
      {loading.loading && <Loader />}
    </div>
  );
};

export default GlobalLoader;