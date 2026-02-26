export interface ProductListParams {
    limit: number;
    page: number;
}

export interface CreateProductParam {
    id:string,
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface DeleteProductParams {
    id: string;
}
