import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { n2m } from '@/lib';
import { notion } from '@/lib/notion';
import { Post } from '@/types';

const DatabasesIds = {
  journal: process.env.NOTION_JOURNAL_DATABASE_ID as string,
  blog: process.env.NOTION_BLOG_DATABASE_ID as string,
};

/**
 * Get the page content from the Notion page and return it as a string.
 *
 * @param pageId - The ID of the Notion page.
 * @returns The page content as a string.
 */
async function getPostInfo(id: string) {
  const blocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(blocks);
  const postInfo = (await notion.pages.retrieve({ page_id: id })) as PageObjectResponse;
  return { content: mdString.parent, info: createPost(postInfo) };
}

/**
 * Get all the posts from the Notion database and return them as an array of Post objects which
 * has Published status. It filters out the posts that don't have the required properties and
 * maps the rest to Post objects. Also it filters out the null values.
 *
 * @param target - The target database to get the posts from.
 * @returns A Promise of array with `Post` objects.
 */
async function getPosts(target: keyof typeof DatabasesIds): Promise<Post[]> {
  // Get the posts from the Notion database for the given target.
  const { results } = await notion.databases.query({
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

  const posts = results as PageObjectResponse[];
  return posts.map((post) => createPost(post)).filter((post) => !!post);
}

function createPost(data: PageObjectResponse) {
  const { id, properties, cover, created_time, last_edited_time } = data;
  if (
    !('Name' in properties) ||
    !('Tags' in properties) ||
    !('Status' in properties) ||
    !('Synopsis' in properties)
  ) {
    return null;
  }

  if (
    properties.Name.type !== 'title' ||
    properties.Tags.type !== 'multi_select' ||
    properties.Status.type !== 'select' ||
    properties.Synopsis.type !== 'rich_text' ||
    !cover
  ) {
    return null;
  }

  // This makes sure that the post has the required properties even if they notion data
  // is inconsistent or changed.
  try {
    const title = properties.Name.title[0].plain_text;
    const tags = properties.Tags.multi_select.map(({ name }) => name);
    const coverImg = cover?.type === 'external' ? cover.external.url : cover?.file.url;
    const synopsis = properties.Synopsis.rich_text[0].plain_text;
    return new Post(id, title, synopsis, coverImg, tags, created_time, last_edited_time);
  } catch {
    return null;
  }
}

export { getPosts, getPostInfo };
