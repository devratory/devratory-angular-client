import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { MethodDefinition } from '../../models';

const TYPE_TO_LAYOUT: any = {
  top: 'column-reverse',
  bottom: 'column',
  right: 'row',
  left: 'row-reverse',
};
const TYPE_TO_ICON: any = {
  top: 'east',
  bottom: 'east',
  right: 'east',
  left: 'east',
};
@Component({
  selector: 'dl-ms-call-step',
  templateUrl: './ms-call-step.component.html',
  styleUrls: ['./ms-call-step.component.scss'],
  providers: [NodeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MsCallStepComponent extends NodeComponent {
  @Input() methodDefinition!: { ms: string; method: MethodDefinition };
  @Output() connect = new EventEmitter<{ connector: string; type: string }>();
  @Output() deleteStep = new EventEmitter();
  connectors = ['top', 'bottom', 'right', 'left'].map((type) => ({
    type,
    arrowIcon: TYPE_TO_ICON[type as any],
    layout: TYPE_TO_LAYOUT[type as any],
  }));
  connections: any = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  };
  activeConnector!: string;
  expandedInputs: { [key: string]: boolean } = {};
  constructor(
    protected service: NodeService,
    protected cdr: ChangeDetectorRef
  ) {
    super(service, cdr);
  }
}
