import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { getPostInfo } from '@/actions/posts';
import { Markdown } from '@/components/ui/markdown';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostInfo(params.id);

  return (
    <div
      className={twMerge(
        'prose lg:prose-lg mx-auto py-20',
        'dark:prose-invert prose-zinc',
        'prose-p:font-[family-name:var(--font-geist-sans)]',
      )}
    >
      <h1>{post.info?.title}</h1>
      <p className="text-muted-foreground">{post.info?.synopsis}</p>
      {post.info?.cover && (
        <Image
          className="w-full h-80"
          src={post.info?.cover}
          alt={`Cover image for ${post.info?.title}`}
          quality={80}
          width={680}
          height={320}
          priority
        />
      )}
      <Markdown>{post.content}</Markdown>
    </div>
  );
}
