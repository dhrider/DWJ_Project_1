import { Component} from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  posts = [
    new Post('Mon premier post',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
              'Aliquam ornare venenatis nisl vel pharetra. Pellentesque bibendum urna sapien, ' +
              'et fermentum libero placerat ut. Sed bibendum erat libero, vel semper est finibus a. ' +
              'Fusce ut egestas elit, at mollis tellus. Donec volutpat mollis faucibus. ' +
              'Pellentesque sed nunc cursus, sollicitudin urna nec.\n' +
              '\n',
              0
    ),
    new Post('Mon deuxième post',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Aliquam ornare venenatis nisl vel pharetra. Pellentesque bibendum urna sapien, ' +
            'et fermentum libero placerat ut. Sed bibendum erat libero, vel semper est finibus a. ' +
            'Fusce ut egestas elit, at mollis tellus. Donec volutpat mollis faucibus. ' +
            'Pellentesque sed nunc cursus, sollicitudin urna nec.\n' +
            '\n',
            0
    ),
    new Post('Mon troisième post',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Aliquam ornare venenatis nisl vel pharetra. Pellentesque bibendum urna sapien, ' +
            'et fermentum libero placerat ut. Sed bibendum erat libero, vel semper est finibus a. ' +
            'Fusce ut egestas elit, at mollis tellus. Donec volutpat mollis faucibus. ' +
            'Pellentesque sed nunc cursus, sollicitudin urna nec.\n' +
            '\n',
            0
    )
  ];
}
