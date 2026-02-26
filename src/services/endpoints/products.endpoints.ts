import { CONFIG } from "@src/constants/config";

const PRODUCT = `${CONFIG.API_URL}/products`
export const PRODUCT_ENDPOINTS = {
    LIST: `${PRODUCT}/list`,
    CREATE: `${PRODUCT}/create`,
    DELETE: `${PRODUCT}/delete`,
    UPDATE: `${PRODUCT}/update`,
    
}