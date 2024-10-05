/**
 * The Post class represents a post object with the required properties.
 */
export class Post {
  constructor(
    public id: string,
    public title: string,
    public synopsis: string,
    public cover: string | undefined,
    public tags: string[],
    public created: string,
    public updated: string,
  ) {}
}
