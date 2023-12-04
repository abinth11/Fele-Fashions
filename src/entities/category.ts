import { ICategory } from "../types/category";
import { generateRandomId } from "../utils/helper-function";
const attr = require('dynamodb-data-types').AttributeValue;

class Category {
    categoryId: string;
    categoryName: string;

    constructor({ categoryName }: ICategory) {
        this.categoryId = generateRandomId();
        this.categoryName = categoryName;
    }

    marshal() {
        return attr.wrap({ categoryId: this.categoryId, categoryName: this.categoryName })
    }
}

export default Category;
