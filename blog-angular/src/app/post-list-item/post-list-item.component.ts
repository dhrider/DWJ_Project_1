import { Component,Input , OnInit } from '@angular/core';


@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})

export class PostListItemComponent implements OnInit {

  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postDate: string;
  @Input() postLoveIts: number;

  constructor() {
  }

  ngOnInit() {
  }

  like() {
    return this.postLoveIts += 1 ;
  }

  dislike() {
    return this.postLoveIts -=1;
  }

  getTextColor() {
    if(this.postLoveIts > 0) {
      return 'green';
    }else if(this.postLoveIts < 0) {
      return 'red';
    } else {
      return 'black';
    }
  }

}
