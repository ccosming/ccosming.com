import { DateTime } from 'luxon';
import Image from 'next/image';

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

export const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
      {posts.map(({ id, cover, title, tags, created }) => (
        <Card key={id}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
            <CardDescription>
              {DateTime.fromISO(created).setLocale('es').toLocaleString(DateTime.DATETIME_MED)}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {cover && (
              <Image
                className="w-full h-48 rounded-sm"
                src={cover}
                alt={`Cover image for ${title}`}
                width={400}
                height={200}
                quality={10}
                priority
              />
            )}
          </CardContent>

          <CardFooter>
            <div className="flex">
              {tags.map((tag, key) => (
                <Badge variant="outline" key={key}>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
