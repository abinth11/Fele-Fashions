import { IProduct } from "../types/product";
import { generateRandomId } from "../utils/helper-function";
const attr = require('dynamodb-data-types').AttributeValue;

class Product {
    productId: string;
    productName: string;
    price: number;
    brand: string;
    productImage: string;
    categoryId: string;

    constructor({ productName, brand, price, productImage, categoryId }: IProduct) {
        this.productId = generateRandomId();
        this.productName = productName
        this.price = price
        this.brand = brand
        this.productImage = productImage
        this.categoryId = categoryId
    }

    marshal() {
        return attr.wrap({
            productId: this.productId,
            productName: this.productName,
            price: this.price,
            brand: this.brand,
            productImage: this.productImage,
            categoryId: this.categoryId
        })
    }
}

export default Product;
