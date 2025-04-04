import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const clientId = 'YOUR_GOOGLE_CLIENT_ID';

  const onSuccess = (response: unknown) => {
    console.log('Login Success:', response);
  };

  const onFailure = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;