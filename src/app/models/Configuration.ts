import { ResourceModel } from './ResourceModel';

export class Configuration extends ResourceModel<Configuration> {
  constructor(model?: Partial<Configuration>) {
    super(model);
  }
}