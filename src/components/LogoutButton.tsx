import React from 'react';
import { Button } from 'primereact/button';
import { useKeycloak } from '@react-keycloak/web';

export const LogoutButton: React.FC = () => {
  const { keycloak } = useKeycloak();
  return (
    <Button
      text
      className='!text-white'
      onClick={() => keycloak.logout()}
    >
      登出
    </Button>
  );
}