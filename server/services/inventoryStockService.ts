import INVStaff from '../models/inventoryStaffModel';
import { Types } from 'mongoose';

export const getStockManagerIds = async (): Promise<Types.ObjectId[]> => {
  try {
    const stockManager = await INVStaff.find({ role: 'stockmanager' }).select('_id');
    return stockManager.map(person => person._id);
  } catch (error) {
    console.error('Error fetching stock managers IDs:', error);
    throw new Error('Failed to fetch stock managers IDs');
  }
};
