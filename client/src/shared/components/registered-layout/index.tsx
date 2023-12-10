import { FCWithChildren } from '../../types';
import { Container } from '../container';
import { Header } from '../header';

export const Registered: FCWithChildren = ({ children }) => (
  <div className="w-screen h-screen">
    <Header />
    <Container>{children}</Container>
  </div>
);
