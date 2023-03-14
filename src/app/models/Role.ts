import { Permission } from "./Permission";
import { ResourceModel } from "./ResourceModel";

export class Role extends ResourceModel<Role> {
  name!: string;
  slug!: string;
  guard_name!: string;
  permissions?: Permission[];

  constructor(model?: Partial<Role>) {
    super(model);
  }
}