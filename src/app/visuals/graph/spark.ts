import { Node } from '../../d3/models';
import { Link } from '../../d3/models';

export interface Spark {
  nodes: Node[];
  links: Link[];
  adjacentSubgraphs: number[];
  algoTime: number;
  queryTime: number;
}
