import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

/**
 * Notion client
 */
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/**
 * Notion to markdown converter.
 */
export const n2m = new NotionToMarkdown({ notionClient: notion });
