import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];

  showConfig = true;
  toggleConfig() { this.showConfig = !this.showConfig; }

  constructor() {
    const N = 3;


    this.nodes.push(new Node(0))
    this.nodes.push(new Node(1))
    this.nodes[0].linkCount++
    this.nodes[1].linkCount++
    this.links.push(new Link(0, 1));

    /** constructing the nodes array */
    // for (let i = 1; i <= N; i++) {
    //   this.nodes.push(new Node(i));
    // }

    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     // this.nodes[getIndex(i)].linkCount++;
    //     // this.nodes[getIndex(i * m)].linkCount++;
    //
    //     /** connecting the nodes before starting the simulation */
    //     this.links.push(new Link(i, i * m));
    //   }
    // }
  }
}
