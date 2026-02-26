import { ProductModel } from "@src/types/models/products.model";
import { CreateProductParam, DeleteProductParams, ProductListParams } from "./products.types";
import { apiClient } from "@src/services/api/client";
import { PRODUCT_ENDPOINTS } from "@src/services/endpoints";
import { ProductsAdapter } from "./products.adapter";
import { ProductListDto } from "./products.dto";

class ProductsService {
    async getProducts(params:ProductListParams):Promise<ProductModel[]>{
        try {
            const response = await apiClient.get<ProductListDto[]>(PRODUCT_ENDPOINTS.LIST, { params });
            return ProductsAdapter.toModelList(response.data);

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    async createProduct(params:CreateProductParam):Promise<ProductModel>{
        try{
            const response = await apiClient.post<ProductModel>(PRODUCT_ENDPOINTS.CREATE,{params})
            return ProductsAdapter.toModel(response.data)
        }catch(error){
            console.error('Login error:', error);
            throw error;
        }
    }
    async deleteProduct(params:DeleteProductParams):Promise<ProductModel>{
        try{
            const response = await apiClient.delete<ProductModel>(PRODUCT_ENDPOINTS.DELETE,{params})
            return ProductsAdapter.toModel(response.data)
        }catch(error){
            console.error('Login error:', error);
            throw error;
        }
    }
    async updateProduct(params:CreateProductParam):Promise<ProductModel>{
        try{
            const response = await apiClient.put<ProductModel>(PRODUCT_ENDPOINTS.UPDATE,{params})
            return ProductsAdapter.toModel(response.data)
        }catch(error){
            console.error('Login error:', error);
            throw error;
        }

    }
}

export const productsService = new ProductsService();