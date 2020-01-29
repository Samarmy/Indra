// path : d3/models/force-directed-graph.ts

import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';

const FORCES = {
    LINKS: 1 / 50,
    COLLISION: 1,
    CHARGE: -100
}

export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
    public simulation: d3.Simulation<any, any>;

    public nodes: Node[] = [];
    public links: Link[] = [];
    public tmpNodes: Node[] = [];
    public tmpLinks: Link[] = [];
    public origNodes: Node[] = [];
    public origLinks: Link[] = [];

    constructor(nodes, links, options: { width, height }) {
        this.nodes = nodes;
        this.links = links;
        this.origNodes = nodes;
        this.origLinks = links;

        this.initSimulation(options);
    }

    initNodes() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        this.simulation.nodes(this.nodes);
    }

    initLinks() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        this.simulation.force("link", d3.forceLink(this.links).id(function(d) {
            return (d as Node).id;
          })
        );
    }

    initSimulation(options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            const ticker = this.ticker;

            // Creating the force simulation and defining the charges
            this.simulation = d3.forceSimulation()
            .force("charge",
                d3.forceManyBody()
                    .strength(FORCES.CHARGE)
            );

            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker.emit(this);
            });

            this.initNodes();
            this.initLinks();
        }

        /** Updating the central force of the simulation */
        this.simulation.force("centers", d3.forceCenter(options.width / 2, options.height / 2));

        /** Restarting the simulation internal timer */
        this.simulation.restart();
    }

    refreshGraph(){
      this.nodes.length = 0;
      this.links.length = 0;
    }

    filterHorizontal(vertexOneFilterList, edgeFilterList, vertexTwoFilterList, origGraph) {

      if(!origGraph){
        vertexOneFilterList = vertexOneFilterList.concat(this.nodes.map(({id}) => id))
      }

      this.tmpNodes.length = 0;
      this.tmpLinks.length = 0;

      this.origNodes.forEach(function (node) {
        if(vertexOneFilterList.length == 0){
          this.tmpNodes.push(node);
        }else if (vertexOneFilterList.includes(node.id)) {
          this.tmpNodes.push(node);
        }
      }.bind(this));

      this.origLinks.forEach(function (link) {
        if(edgeFilterList.length == 0 && (vertexOneFilterList.length == 0 || (vertexOneFilterList.includes(link.source.id) && vertexOneFilterList.includes(link.target.id)))){
          // new graph contains verticess from vertexOneFilterList already, edgeFilterList is empty
          if(!this.tmpLinks.includes(link)){
            this.tmpLinks.push(link);
          }
        } else if (vertexTwoFilterList.length == 0 && (vertexOneFilterList.length == 0 || (vertexOneFilterList.includes(link.source.id) && vertexOneFilterList.includes(link.target.id)))){
          // new graph contains verticess from vertexOneFilterList already
          // add property check for edges below
          if(true && !this.tmpLinks.includes(link)){
            this.tmpLinks.push(link);
          }
        } else if (edgeFilterList.length == 0 && vertexTwoFilterList.length == 0 && (vertexOneFilterList.includes(link.source.id) || vertexOneFilterList.includes(link.target.id))){
          // new graph contains one vertex from vertexOneFilterList already, edgeFilterList is empty, vertexTwoFilterList is empty
          if(!this.tmpNodes.includes(link.target)){
            this.tmpNodes.push(link.target);
          } else if (!this.tmpNodes.includes(link.source)){
            this.tmpNodes.push(link.source);
          }
          if(!this.tmpLinks.includes(link)){
            this.tmpLinks.push(link);
          }
        } else if (vertexTwoFilterList.length == 0 && (vertexOneFilterList.includes(link.source.id) || vertexOneFilterList.includes(link.target.id))){
          // new graph contains one vertex from vertexOneFilterList already, vertexTwoFilterList is empty
          // add property check for edges below
          if(true){
            if(!this.tmpNodes.includes(link.target)){
              this.tmpNodes.push(link.target);
            } else if (!this.tmpNodes.includes(link.source)){
              this.tmpNodes.push(link.source);
            }
            if(!this.tmpLinks.includes(link)){
              this.tmpLinks.push(link);
            }
          }
        } else if (edgeFilterList.length == 0 &&  vertexOneFilterList.includes(link.target.id) && vertexTwoFilterList.includes(link.source.id)){
            // new graph contains target vertex from vertexOneFilterList already, edgeFilterList is empty
          if (!this.tmpNodes.includes(link.source)){
            this.tmpNodes.push(link.source);
          }
          if(!this.tmpLinks.includes(link)){
            this.tmpLinks.push(link);
          }
        } else if (edgeFilterList.length == 0 && vertexOneFilterList.includes(link.source.id) && vertexTwoFilterList.includes(link.target.id)){
          // new graph contains source vertex from vertexOneFilterList already, edgeFilterList is empty
          if (!this.tmpNodes.includes(link.target)){
            this.tmpNodes.push(link.target);
          }
          if(!this.tmpLinks.includes(link)){
            this.tmpLinks.push(link);
          }
        } else if (vertexOneFilterList.includes(link.source.id) && vertexTwoFilterList.includes(link.target.id)){
          // new graph contains source vertex from vertexOneFilterList already
            // add property check for edges below
          if(true){
            if (!this.tmpNodes.includes(link.target)){
              this.tmpNodes.push(link.target);
            }
            if(!this.tmpLinks.includes(link)){
              this.tmpLinks.push(link);
            }
          }

        } else if (vertexOneFilterList.includes(link.target.id) && vertexTwoFilterList.includes(link.source.id)){
            // new graph contains target vertex from vertexOneFilterList already
              // add property check for edges below
            if(true){
              if (!this.tmpNodes.includes(link.source)){
                this.tmpNodes.push(link.source);
              }
              if(!this.tmpLinks.includes(link)){
                this.tmpLinks.push(link);
              }
            }
        }
      }.bind(this));

      this.nodes = this.tmpNodes;
      this.links = this.tmpLinks;
    }
}
