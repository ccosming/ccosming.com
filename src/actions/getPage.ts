import { n2m } from '@/lib';

/**
 * Get the page content from the Notion page and return it as a string.
 *
 * @param pageId - The ID of the Notion page.
 * @returns The page content as a string.
 */
export const getPage = async (pageId: string): Promise<string> => {
  const blocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(blocks);
  return mdString.parent;
};
