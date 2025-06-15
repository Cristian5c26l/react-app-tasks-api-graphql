import { Dashboard } from "./modules/common/components/Dashboard";
import { useState } from 'react';
import './index.css'
import { LoginPage } from './modules/auth/pages/LoginPage';

export const App = () => {

  const [loginSuccess, setLoginSuccess] = useState(false);

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
