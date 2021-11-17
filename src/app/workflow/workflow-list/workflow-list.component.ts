import { Component, OnInit } from '@angular/core';
import { combineQueries } from '@datorama/akita';
import { NodeData, NodesData } from 'rete/types/core/data';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Microservice } from 'src/app/microservice/state/microservice.model';
import { MicroserviceService } from 'src/app/microservice/state/microservice.service';
import { ProjectQuery } from 'src/app/project/state';
import { Workflow, WorkflowQuery, WorkflowService } from '../state';
import { StepInput, StepInputType } from '../workflow.interface';

class WorkflowSerializer {
  constructor(private _microservices: Microservice[] = []) {}

  serialize(workflow: Workflow) {
    const nodes = JSON.parse(workflow.nodes as string) as NodesData;
    const steps = Object.entries(nodes).map(([id, node]) => this._serializeNode(node, nodes, true));

    return {
      name: workflow.id,
      httpMethod: workflow.httpMethod,
      url: workflow.url,
      output: null,
      steps: steps.filter((step) => !!step),
    };
  }

  _serializeNode(node: NodeData, nodes: NodesData, onlyMainFlow = false) {
    // node.name is the name of the component which we can use as type
    switch (node.name) {
      case 'MS_CALL':
        return this._serializeMSCall(node, nodes, onlyMainFlow);
      default:
        return null;
    }
  }

  _serializeMSCall(node: NodeData, nodes: NodesData, onlyMainFlow = false) {
    const method: any = node.data.method;
    const microservice: any = node.data.microservice;
    const connectionsIn = node.inputs[`${microservice.name}/${method.name}.flowIn`].connections;
    const connectionsOut = node.outputs[`${microservice.name}/${method.name}.flowOut`].connections;
    if (!connectionsIn.length && !connectionsOut.length && onlyMainFlow) {
      // Not main flow, these nodes are part of the payload for main flow steps
      return null;
    }
    return {
      $$type: node.name,
      name: method.name,
      pattern: method.pattern,
      payload: this._serializeInput(method.input, nodes),
    };
  }

  _serializeInput(input: StepInput, nodes: NodesData) {
    if (!input) {
      return null;
    }
    console.log(input.type);
    const serialzied: any = {}; // FIXME
    if (input.reteInput?.connections?.length) {
      const node = nodes[(input.reteInput?.connections[0] as any).node];
      if (node) {
        const readFrom = (input.reteInput?.connections[0] as any).output.split('.output.')[1];
        const serializedNode: any = this._serializeNode(node, nodes);
        if (input.type !== StepInputType.Object) {
          return { ...serializedNode, readFrom };
        }
        serialzied['...'] = { ...serializedNode, readFrom };
      }
    } else {
      return;
    }

    if (input.type === StepInputType.Object && Object.keys(input.properties || {}).length) {
      Object.entries(input.properties || {}).forEach(([name, innerInput]) => {
        serialzied[name] = this._serializeInput(innerInput, nodes);
      });
    }
    return serialzied;
  }
}
@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit {
  workflows$ = combineQueries([this.query.selectAll(), this.projectQuery.selectActiveId()]).pipe(
    map(([workflows, projectId]) => workflows.filter((wf) => wf.projectId === projectId))
  );

  constructor(
    private service: WorkflowService,
    private query: WorkflowQuery,
    private projectQuery: ProjectQuery,
    private microserviceService: MicroserviceService
  ) {}

  ngOnInit(): void {
    const projectId = this.projectQuery.getActiveId();
    forkJoin([this.service.getByProjectId(projectId), this.microserviceService.getByProjectId(projectId)]).subscribe(
      ([workflows, microservices]) => {
        console.log(new WorkflowSerializer(microservices).serialize(workflows[0]));
      }
    );
  }
}
