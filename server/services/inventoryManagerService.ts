import INVStaff from '../models/inventoryStaffModel';
import { Types } from 'mongoose';

export const getInventoryManagerIds = async (): Promise<Types.ObjectId[]> => {
  try {
    const manager = await INVStaff.find({ role: 'invmanager' }).select('_id');
    return manager.map(person => person._id);
  } catch (error) {
    console.error('Error fetching inventory managers IDs:', error);
    throw new Error('Failed to fetch inventory managers IDs');
  }
};
