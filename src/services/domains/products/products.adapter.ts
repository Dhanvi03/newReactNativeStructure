import { ProductListDto } from "./products.dto";
import { ProductModel } from "@src/types/models/products.model";

export class ProductsAdapter {
  static toModel(dto:ProductListDto):ProductModel{
    return{
        id:dto.id,
        name:dto.name,
        price:dto.price,
        image:dto.image,
        description:dto.description,
        category:dto.category,
        rating:dto.rating,
        stock:dto.stock,
    }
  }
}