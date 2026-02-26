import { ProductListDto } from "./products.dto";
import { ProductModel } from "@src/types/models/products.model";

export class ProductsAdapter {

  // Array → for GET list
  static toModelList(dto: ProductListDto[]): ProductModel[] {
    return dto.map((item) => ProductsAdapter.toModel(item))
  }

  // Single object → for POST/PUT/GET detail
  static toModel(dto: ProductListDto): ProductModel {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
      image: dto.image,
      description: dto.description,
      category: dto.category,
      rating: dto.rating,
      stock: dto.stock,
    }
  }
}

// =============can use below===============
// products.dto.ts

// Single item shape (what API returns for one product)
// export interface ProductDto {
//   id: string
//   name: string
//   price: number
//   image: string
//   description: string
//   category: string
//   rating: number
//   stock: number
// }

// List shape — if API wraps array in object like { data: [], total: 0 }
// export interface ProductListDto {
//   data: ProductDto[]
//   total: number
//   page: number
// }

// If API returns plain array directly → just use ProductDto[]