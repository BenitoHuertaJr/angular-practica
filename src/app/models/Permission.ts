import { ResourceModel } from './ResourceModel';

export class Permission extends ResourceModel<Permission> {

  name!: string;
  guard_name!: string;
  display_name!: string;

  constructor(model?: Partial<Permission>) {
    super(model);
  }
}