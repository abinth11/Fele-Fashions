import { ICategory } from "../types/category";
import { generateRandomId } from "../utils/helper-function";

class Category {
    categoryId: string;
    categoryName: string;

    constructor({categoryName }: ICategory) {
        this.categoryId = generateRandomId();
        this.categoryName = categoryName;
    }

    toDynamoDBItem(){
        return {
            'categoryId': { 'S':this.categoryId.toString() },
            'categoryName': { 'S': this.categoryName },
        };
    }
}

export default Category;
