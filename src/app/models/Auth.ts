import { Configuration } from './Configuration';
import { User } from "./User";

export class Auth {
  token?: string;
  permissions?: string[];
  user?: User;
  configuration?: Configuration;

  constructor(data: Partial<Auth>) {
    Object.assign(this, data);
  }
}