import { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="w-[1024px] pt-20 mx-auto font-[family-name:var(--font-geist-sans)]">
    {children}
  </div>
);
