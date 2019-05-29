export class Post {
  created_at: any;

  constructor(public title: string, public content: string, public loveIts: number) {
    this.created_at = new Date();
  }

}
