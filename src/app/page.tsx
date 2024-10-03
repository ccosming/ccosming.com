import type { Metadata } from 'next';
import Image from 'next/image';

import { getPosts } from '@/actions';
import { ThemeToggle } from '@/components/theme-toogle';
import { Button } from '@/components/ui/button';

import Avatar from './images/me.png';

export const metadata: Metadata = {
  title: 'Carlos Cosming Website',
  description: 'Welcome to my world',
};

export default async function Home() {
  const posts = await getPosts('journal');

  return (
    <div className="w-[960px] mx-auto text-center font-[family-name:var(--font-geist-sans)]">
      <div className="mx-auto mt-10">
        <Image
          className="mx-auto rounded-full"
          src={Avatar}
          alt="Carlos Cosming avatar"
          width={150}
          height={150}
        />

        <h1>Hello, my name is Carlos Cosming</h1>

        <p className="text-xl text-muted-foreground">
          I am a software engineer and entrepreneur. I am passionate about building products and
          companies that make a difference in the world. Currently, Now working on my startup
          Dynamic Quants.
        </p>

        <Button>My work</Button>
        <Button variant="outline">My journal</Button>

        <ThemeToggle />
      </div>

      <div>
        <h2>Latest posts</h2>

        <ul>
          {posts.map((page, key) => (
            <li key={key}>
              <h3>{page.id}</h3>
              <h2>{page.title}</h2>

              {page.cover && (
                // Fit the image to the container.
                <Image
                  src={page.cover}
                  alt={`Cover image for ${page.title}`}
                  width={400}
                  height={200}
                  quality={10}
                  priority
                />
              )}

              <p>{page.tags}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
