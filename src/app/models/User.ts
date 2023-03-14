import { ResourceModel } from "./ResourceModel";
import { Role } from "./Role";

export class User extends ResourceModel<User>{
  name!: string;
  slug!: string;
  email!: string;
  email_verified_at?: Date | null;
  image!: string;
  image_link!: string;
  roles?: Role[];

  constructor(model?: Partial<User>) {
    super(model);
  }
}