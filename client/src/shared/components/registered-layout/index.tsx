import { FCWithChildren } from '../../types';
import { Header } from '../header';
import { Container } from '../container';

export const Registered: FCWithChildren = ({ children }) => {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Container>{children}</Container>
    </div>
  );
};
