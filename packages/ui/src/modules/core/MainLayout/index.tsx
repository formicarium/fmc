import React from 'react'
import { Container } from 'semantic-ui-react';
import { TopMenu } from '../TopMenu';
import { Routes } from '../components/Routes';
import { ToastContainer } from 'react-toastify';

export const MainLayout = () => (
  <Container>
    <TopMenu />
    <ToastContainer />
    <Routes />
  </Container>
)
