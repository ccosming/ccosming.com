import { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="w-[960px] pt-20 mx-auto text-center font-[family-name:var(--font-geist-sans)]">
    {children}
  </div>
);
