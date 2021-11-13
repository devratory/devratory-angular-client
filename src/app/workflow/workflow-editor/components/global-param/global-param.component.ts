import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
import { StepInput } from '../../models';

@Component({
  selector: 'app-global-param',
  templateUrl: './global-param.component.html',
  styleUrls: ['./global-param.component.scss'],
  providers: [NodeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalParamComponent extends NodeComponent {
  get globals(): {
    [key: string]: StepInput<any>;
  } {
    return this.node.data as any;
  }

  constructor(service: NodeService, cdr: ChangeDetectorRef) {
    super(service, cdr);
  }
}
