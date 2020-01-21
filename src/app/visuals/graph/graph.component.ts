import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, DoCheck } from '@angular/core';
import { D3Service, ForceDirectedGraph, Node, Link } from '../../d3';

import { SparkService } from './spark.service';
import { Spark } from './spark';

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [SparkService]
})
export class GraphComponent implements OnInit, DoCheck {
  @Input('graph') graph: ForceDirectedGraph;
  graphInitialized: boolean = false;
  stack: number[] = [] as number[];
  private _options: { width, height } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef, private sparkService: SparkService) {
  }

  ngDoCheck(){
    if(this.graph && !this.graphInitialized){
      this.graph.initSimulation(this.options);
      this.graphInitialized = true
    }
  }

  ngOnInit() {
    this.postSpark("");
  }

  refreshButton(){
    this.stack = [];
    this.graph.refreshGraph()
    this.postSpark("");
  }

  popButton(){
    this.stack.pop();
    this.graph.refreshGraph()
    this.postSpark(this.stack.toString());
  }

  viewSuperNode(event, id){
    this.stack.push(id)
    this.graph.refreshGraph()
    this.postSpark(this.stack.toString());
  }

  postSpark(stack: string): void {
    this.sparkService.postSpark(stack)
      .subscribe((spark: unknown) => {
        this.graph = this.d3Service.getForceDirectedGraph((spark as Spark).nodes, (spark as Spark).links, this.options);
        this.graph.initSimulation(this.options);
        this.graph.ticker.subscribe((d) => {
          this.ref.markForCheck();
        });
      });
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}