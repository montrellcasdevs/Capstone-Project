import { apiRequest } from "./apiClient";

export async function getProductList(searchTerm){
    const data = await apiRequest(`/444/products?name_like=${searchTerm ? searchTerm : ""}`);
    return data;
}

export async function getProduct(id){
    const data = await apiRequest(`/444/products/${id}`);
    return data;
}

export async function getFeaturedList(){
    const data = await apiRequest("/444/featured_products");
    return data;
}