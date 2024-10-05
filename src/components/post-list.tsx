import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Post } from '@/types';

import { Badge } from './ui/badge';
import { Button } from './ui/button';

const PostHeader: FC<Pick<Post, 'title' | 'cover' | 'tags' | 'created'>> = ({
  title,
  cover,
  tags,
  created,
}) => {
  return (
    <CardHeader>
      <div className="relative">
        {cover && (
          <Image
            className="w-full h-48 rounded-sm"
            src={cover}
            alt={`Cover image for ${title}`}
            width={300}
            height={180}
            quality={10}
            priority
          />
        )}

        <div className="flex absolute bottom-2 left-2">
          {tags.map((tag, key) => (
            <Badge variant="default" key={key}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <CardDescription>
        {DateTime.fromISO(created)
          .setLocale('es')
          .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
      </CardDescription>
    </CardHeader>
  );
};

export const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      {posts.map(({ id, cover, title, synopsis, tags, created }) => (
        <Card key={id}>
          <PostHeader title={title} cover={cover} tags={tags} created={created} />
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="line-clamp-3">{synopsis}</CardDescription>
          </CardContent>

          <CardFooter>
            <Button asChild>
              <Link href={`/blog/${id}`}>Read more</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
