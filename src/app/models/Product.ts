import { ResourceModel } from "./ResourceModel";
export class Product extends ResourceModel<Product>{

  name!: string;
  slug!: string;
  bar_code!: string;
  image?: string | null;
  image_link?: string | null;
  measurement_unit!: string;
  sub_category_id!: number;
  sub_category_name?: string | null;
  earning?: number;

  constructor(model?: Partial<Product>) {
    super(model);
  }
}