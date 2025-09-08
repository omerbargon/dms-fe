import React, { useContext } from 'react';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { LoadingSplash } from '../common/components/Loading/LoadingSplash';
import { AuthContext } from './AuthProvider';

export default () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn === null) {
    return <LoadingSplash />;
  }
  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};
