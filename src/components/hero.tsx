import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button, ButtonProps } from './ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  buttons: {
    text: string;
    link: string;
    variant: ButtonProps['variant'];
  }[];
}

export const Hero: FC<HeroProps> = ({ title, subtitle, buttons }) => {
  return (
    <div className="w-[780px] mx-auto h-screen flex flex-col items-center justify-center gap-5">
      <Avatar className="size-40">
        <AvatarImage asChild src="https://github.com/ccosming.png">
          <Image src="https://github.com/ccosming.png" alt="logo" width={200} height={200} />
        </AvatarImage>
      </Avatar>

      <div className="text-center">
        <h1>{title}</h1>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
      </div>

      <ul className="flex gap-2">
        {buttons.map(({ link, text, variant }, key) => (
          <li key={key}>
            <Button asChild variant={variant}>
              <Link href={link}>{text}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
