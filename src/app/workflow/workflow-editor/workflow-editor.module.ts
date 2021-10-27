import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReteModule } from 'rete-angular-render-plugin';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlowEditorToolbarComponent } from './components/flow-editor-toolbar/flow-editor-toolbar.component';
import { GlobalParamComponent } from './components/global-param/global-param.component';
import { InputChipComponent } from './components/input-chip/input-chip.component';
import { MsCallStepComponent } from './components/ms-call-step/ms-call-step.component';
import { NumberComponent } from './controls/number-control';
import { FlowEditorContainer } from './workflow-editor.container';
import { FlowEditorService } from './workflow-editor.service';

@NgModule({
  declarations: [
    FlowEditorContainer,
    NumberComponent,
    InputChipComponent,
    MsCallStepComponent,
    FlowEditorToolbarComponent,
    GlobalParamComponent,
  ],
  imports: [
    SharedModule,
    ReteModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
    MatSlideToggleModule,
  ],
  exports: [FlowEditorContainer],
  entryComponents: [NumberComponent, FlowEditorContainer],
  providers: [FlowEditorService],
})
export class WorkflowEditorModule {}
