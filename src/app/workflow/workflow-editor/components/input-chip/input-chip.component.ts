import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Node } from 'rete';
import { StepInput } from '../../models';
import { FlowEditorService } from '../../workflow-editor.service';

@Component({
  selector: 'gg-input-chip',
  templateUrl: './input-chip.component.html',
  styleUrls: ['./input-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputChipComponent {
  isArray = false;
  canExpand = false;
  expandableInputs: StepInput<any>[] = [];

  @Input() expanded = false;
  @Input() name!: string;
  @Input() mode!: 'input' | 'output';
  @Input() node!: Node;
  @Input() dynamic = false;

  @Input() plainSockets = false;

  private _input!: StepInput<any>;
  @Input() set input(input: StepInput<any>) {
    this._input = input;
    this.isArray = Array.isArray(this.input?.type);
    this.canExpand =
      (!this.isArray || typeof this.input.type[0] === 'object') &&
      typeof this.input?.type === 'object';
    if (this.canExpand) {
      if (!this.isArray) {
        this.expandableInputs = Object.entries(this.input.type).map(
          ([name, input]) => ({
            ...(input as any),
            name,
          })
        );
      } else {
        this.expandableInputs = Object.entries(this.input.type[0]).map(
          ([name, input]) => ({
            ...(input as any),
            name,
          })
        );
      }
    }
  }
  get input(): StepInput<any> {
    return this._input;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
    this.service.resize$.next();
  }

  defineProperty() {

  }

  constructor(private service: FlowEditorService) {}
}
