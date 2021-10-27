import { Component } from 'rete';
import { NodeType } from '../models';
import { ServiceCallComponent } from './service-call.component';
import { GlobalParamComponentBuilder } from './global-param-component.builder';

export default new Map<NodeType, Component>([
  [NodeType.MicroserviceCall, new ServiceCallComponent()],
  [NodeType.Global, new GlobalParamComponentBuilder()],
]);
