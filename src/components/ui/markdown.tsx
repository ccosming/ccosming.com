import { FC } from 'react';
import ReactMarkdown, { type Options } from 'react-markdown';

type MarkdownProps = Pick<Options, 'children'>;

export const Markdown: FC<MarkdownProps> = ({ children }) => {
  return <ReactMarkdown>{children}</ReactMarkdown>;
};
