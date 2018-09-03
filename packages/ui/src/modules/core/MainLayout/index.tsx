import React from 'react'
import { Container } from 'semantic-ui-react';
import { TopMenu } from '../TopMenu';
import { Routes } from '../components/Routes';

export const MainLayout = () => (
  <Container>
    <TopMenu />
    <Routes />
  </Container>
)
