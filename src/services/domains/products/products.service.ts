import { ProductModel } from "@src/types/models/products.model";
import { ProductListParams } from "./products.types";
import { apiClient } from "@src/services/api/client";
import { PRODUCT_ENDPOINTS } from "@src/services/endpoints/products.endpoints";
import { ProductsAdapter } from "./products.adapter";

class ProductsService {
    async getProducts(params:ProductListParams):Promise<ProductModel[]>{
        try {
            const response = await apiClient.get<ProductModel[]>(PRODUCT_ENDPOINTS.LIST, { params });
            

        } catch (error) {
            
        }
    }
}