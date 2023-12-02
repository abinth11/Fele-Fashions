import { ICategory } from "../types/category";
import { generateRandomId } from "../utils/helper-function";

class Category {
    categoryId: string;
    categoryName: string;
    createdAt: Date;

    constructor({categoryName }: ICategory) {
        this.categoryId = generateRandomId();
        this.categoryName = categoryName;
        this.createdAt = new Date();
    }

    toDynamoDBItem(){
        return {
            'categoryId': { 'N': this.categoryId.toString() },
            'categoryName': { 'S': this.categoryName },
            'createdAt': { 'S': this.createdAt.toISOString() },
        };
    }
}

export default Category;
