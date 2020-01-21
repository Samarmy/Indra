import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { Node } from '../../../d3';
import { GraphComponent } from '../../graph/graph.component';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'" (click)="viewSuperNode()">
      <svg:circle
          class="node"
          r="7"
          cx="0"
          cy="0">
      </svg:circle>
      <svg:circle
          class="inner_circle"
          x="NaN"
          y="NaN"
          r="4"
          style="stroke:rgba(0,0,0,0);"
          [attr.fill]="node.color">
      </svg:circle>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
  @Output() viewSuperNodeEvent: EventEmitter<null> = new EventEmitter();

  viewSuperNode(){
    this.viewSuperNodeEvent.emit()
  }
}
