import { StockInfo } from '../../../../shared/types/Stock';
import BASE_URL from '../sharedVariables';


  export const getAllStocks = async () => {
    const response = await fetch(`${BASE_URL}/stock`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Stock IDs");
    }
  
  const data: StockInfo[] = await response.json();
  console.log(data); 
    return data;
  };
  