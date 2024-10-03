import { notion } from '@/lib/notion';
import { Post } from '@/types';

const DatabasesIds = {
  journal: process.env.NOTION_JOURNAL_DATABASE_ID as string,
  blog: process.env.NOTION_BLOG_DATABASE_ID as string,
};

/**
 * Get all the posts from the Notion database and return them as an array of Post objects which
 * has Published status. It filters out the posts that don't have the required properties and
 * maps the rest to Post objects. Also it filters out the null values.
 *
 * @param target - The target database to get the posts from.
 * @returns A Promise of array with `Post` objects.
 */
export async function getPosts(target: keyof typeof DatabasesIds): Promise<Post[]> {
  // Get the posts from the Notion database for the given target.
  const posts = await notion.databases.query({
    database_id: DatabasesIds[target],

    // Only get the posts with Published status.
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },

    // Sort the posts by created time in descending order (more recent first).
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
  });

  return (
    (posts.results as any[])
      .map(({ id, properties, cover, created_time, last_edited_time }) => {
        // Check if the required properties exist in the post.
        if (!('Name' in properties) || !('Tags' in properties) || !('Status' in properties)) {
          return null;
        }

        // This makes sure that the post has the required properties even if they notion data
        // is inconsistent or changed.
        try {
          const title = properties.Name.title[0].plain_text;
          const tags = properties.Tags.multi_select.map(({ name }: any) => name);
          const coverImg = cover?.type === 'external' ? cover.external.url : cover?.file.url;
          return new Post(id, title, coverImg, tags, created_time, last_edited_time);
        } catch {
          return null;
        }
      })
      // Filter out the posts that don't have the required properties.
      .filter((post) => !!post)
  );
}
