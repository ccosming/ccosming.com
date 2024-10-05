import { type Metadata } from 'next';

import { getPosts } from '@/actions';
import { PostList } from '@/components/post-list';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title:
    'Carlos Journal | Pensamientos y experiencias en el dificil pero disfrutable camino de construir una startup',
  description: 'Welcome to my world',
};

export default async function JournalPage() {
  const posts = await getPosts('journal');

  return (
    <Container>
      <div className="text-left mb-20">
        <h1>Journal</h1>
        <p className="text-xl text-muted-foreground">
          My thoughts and experiences in the hard but enjoyable journey of building a startup.
        </p>
      </div>

      <PostList posts={posts} />
    </Container>
  );
}
