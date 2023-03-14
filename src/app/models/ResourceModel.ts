export abstract class ResourceModel<T> {
  public id?: number;
  public created_at?: Date | null;
  public updated_at?: Date | null;
  public deleted_at?: Date | null;

  constructor(model?: Partial<T>) {
    if (model) {
      Object.assign(this, model);
    }
  }

  public toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}