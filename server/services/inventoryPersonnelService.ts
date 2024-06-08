import INVStaff from '../models/inventoryStaffModel';
import { Types } from 'mongoose';

export const getInventoryPersonnelIds = async (): Promise<Types.ObjectId[]> => {
  try {
    const personnel = await INVStaff.find({ role: 'personnel' }).select('_id');
    return personnel.map(person => person._id);
  } catch (error) {
    console.error('Error fetching inventory personnel IDs:', error);
    throw new Error('Failed to fetch inventory personnel IDs');
  }
};
