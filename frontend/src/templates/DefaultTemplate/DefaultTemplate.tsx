import React from 'react';
import { Header } from '../../organisms/Header';

export interface DefaultTemplateProps {
  children: React.ReactNode;
}

export const DefaultTemplate = ({ children }: DefaultTemplateProps) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
};
