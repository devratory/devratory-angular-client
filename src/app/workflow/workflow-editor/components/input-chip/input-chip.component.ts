import { AfterContentInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Node } from 'rete';
import { StepInput, StepInputType } from '../../models';
import { FlowEditorService } from '../../workflow-editor.service';

@Component({
  selector: 'gg-input-chip',
  templateUrl: './input-chip.component.html',
  styleUrls: ['./input-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputChipComponent implements AfterContentInit {
  isArray = false;
  canExpand = false;
  expandableInputs: StepInput<any>[] = [];

  @Input() expanded = false;
  @Input() name!: string;
  @Input() mode!: 'input' | 'output';
  @Input() node!: Node;
  @Input() dynamic = false;
  @Input() plainSockets = false;
  @Input() input!: StepInput<any>;

  ngAfterContentInit() {
    this._resolveInput(this.input);
  }

  constructor(private service: FlowEditorService) {}

  toggleExpand() {
    this.expanded = !this.expanded;
    this.service.resize$.next();
  }

  defineProperty() {}

  _resolveInput(input: StepInput) {
    if (!input) {
      return;
    }
    this.isArray = input.type === 'array';
    this.canExpand = input.type === StepInputType.Object;
    if (this.canExpand) {
      if (!this.isArray) {
        this.expandableInputs = Object.entries(input.properties || {}).map(([name, input]) => ({
          ...(input as any),
          name,
        }));
      }
      // else {
      //   this.expandableInputs = Object.entries(input.type[0]).map(([name, input]) => ({
      //     ...(input as any),
      //     ...this._resolveRef(input),
      //     items: input.items ? this._resolveRef(input.items) : undefined,
      //     name,
      //   }));
      // }
    }
  }
}
