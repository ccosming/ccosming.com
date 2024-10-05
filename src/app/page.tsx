import type { Metadata } from 'next';

import { Hero } from '@/components/hero';

export const metadata: Metadata = {
  title: 'Carlos Cosming Website',
  description: 'Welcome to my world',
};

export default async function Home() {
  return (
    <Hero
      title="Carlos Cosming González"
      subtitle="I'm a software engineer and entrepreneur with a passion for building products and companies that make a difference in the world. Currently, I'm working on my startup, Dynamic Quants."
      buttons={[
        { text: 'Blog', link: '/blog', variant: 'default' },
        { text: 'Journal', link: '/blog/journal', variant: 'outline' },
      ]}
    />
  );
}
