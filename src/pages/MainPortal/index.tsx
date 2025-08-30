import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import Loading from '../../components/Loading';
import { Container } from '@mui/material';

export const MainPortal: React.FC = () => {

  const { isLoading } = useGlobal();

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
   <></>
  );
};