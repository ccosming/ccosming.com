import type { Metadata } from 'next';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import Avatar from './images/me.png';

export const metadata: Metadata = {
  title: 'Carlos Cosming Website',
  description: 'Welcome to my world',
};

export default function Home() {
  return (
    <div className="container mx-auto text-center font-[family-name:var(--font-geist-sans)]">
      <div className="mx-auto mt-10 w-2/5">
        <Image
          className="mx-auto rounded-full"
          src={Avatar}
          alt="Carlos Cosming avatar"
          width={150}
          height={150}
        />

        <h1>Hey there, my name is Carlos Cosming</h1>

        <p className="text-xl text-muted-foreground">
          I'm a software engineer and entrepreneur. I'm passionate about building products and
          companies that make a difference in the world. Currently, I'm working on my startup
          Dynamic Quants.
        </p>

        <Button>My work</Button>
        <Button variant="outline">My journal</Button>
      </div>
    </div>
  );
}
