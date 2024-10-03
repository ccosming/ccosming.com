import { getPosts } from '@/actions';
import { PostList } from '@/components/post-list';
import { Container } from '@/components/ui/container';

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
