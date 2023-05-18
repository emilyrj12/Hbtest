import { Product } from '../controllers/productController';

export class ProductService {
  public getBayNumericValue(bay: string): number {
    const regex = /([A-Z\s]+)(\d+)/;

    // console.log(bay)
    const match = bay.match(regex);
  
    if (match) {
      const [, bayLetters, bayNumber] = match;
      const base = 'A'.charCodeAt(0) - 1;
      let value = 0;
  
      //console.log("bayLetters:"+bayLetters)
      //console.log("bayNumber:"+bayNumber)
  
      for (let i = 0; i < bayLetters.length; i++) {
        const charValue = bayLetters[i].charCodeAt(0) - base;
        value = value * 26 + charValue;
      }
  
      return value * 100 + parseInt(bayNumber, 10);
    }
  
    return 0;
  }

  public sortProducts(products: Product[]): Product[] {
    products.sort((a, b) => {
        const [aBay, aShelf] = a.pick_location.split('-');
        const [bBay, bShelf] = b.pick_location.split('-');
        const aBayNumeric = this.getBayNumericValue(aBay);
        const bBayNumeric = this.getBayNumericValue(bBay);
    
        if (aBayNumeric !== bBayNumeric) {
          return aBayNumeric - bBayNumeric;
        }
    
        const aShelfNumber = aShelf ? parseInt(aShelf.slice(1), 10) : 0;
        const bShelfNumber = bShelf ? parseInt(bShelf.slice(1), 10) : 0;
    
        if (aShelfNumber !== bShelfNumber) {
          return aShelfNumber - bShelfNumber;
        }
    
        const aBayLetter = aBay[0];
        const bBayLetter = bBay[0];
    
        if (aBayLetter !== bBayLetter) {
          return aBayLetter.localeCompare(bBayLetter);
        }
    
        const aProductCodeNumeric = parseInt(a.product_code.slice(-3), 10);
        const bProductCodeNumeric = parseInt(b.product_code.slice(-3), 10);
    
        return aProductCodeNumeric - bProductCodeNumeric;
      });
    
      return products;
  }

  public parseCSVData(csvData: string): Product[] {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const products: Product[] = [];
  
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
  
      if (values.length === headers.length) {
        const product: Product = {
          product_code: values[0],
          quantity: parseInt(values[1], 10),
          pick_location: values[2]
        };
  
        products.push(product);
      }
    }
  
    return products;
  }

  public convertToCSVData(products: Product[]): string {
    let csvData = 'product_code,quantity,pick_location\n';

    for (const product of products) {
      const { product_code, quantity, pick_location } = product;
      csvData += `${product_code},${quantity},${pick_location}\n`;
    }
  
    return csvData;
  }
}
