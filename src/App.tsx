import { useEffect, useState } from 'react';
import validator from 'validator';
import { Dashboard } from "./modules/common/components/Dashboard";
import './index.css'
import { LoginPage } from './modules/auth/pages/LoginPage';

export const App = () => {

  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId && validator.isUUID(userId)) {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
  }, []);

  return (
    <>
      {/* <Dashboard /> */}
      {/* <LoginPage /> */}
      {loginSuccess ? (
        <Dashboard />
      ) : (
        <LoginPage setLoginSuccess={setLoginSuccess} />
      )}
    </>
  );
};
