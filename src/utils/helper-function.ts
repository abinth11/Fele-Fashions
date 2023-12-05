import { v4 as uuidv4 } from 'uuid';

export const generateRandomId = () => uuidv4();

export const validateLimitAndSkip = (limit: number, offset: number):boolean => {
    if (!limit) {
      limit = 12
    }
    if (!offset) {
      offset = 0
    }
    
    return limit <= 100
  }