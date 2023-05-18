import * as fs from 'fs';
import { ProductService } from '../services/productService';

const inputFilePath = './data/input.csv';
// const outputFilePath = 'output.csv';

export interface Product {
  product_code: string;
  quantity: number;
  pick_location: string;
}


export async function sortProducts(): Promise<void> {
  try {
    const productService = new ProductService();

    const inputData = fs.readFileSync(inputFilePath, 'utf-8');
    const products = productService.parseCSVData(inputData);
    const sortedProducts = productService.sortProducts(products);
    const outputData = productService.convertToCSVData(sortedProducts);

    // fs.writeFileSync(outputFilePath, outputData, 'utf-8');

    // console.log('Sorting completed. Output written to output.csv.');
    
  } catch (error) {
    console.error(error);
  }
}
