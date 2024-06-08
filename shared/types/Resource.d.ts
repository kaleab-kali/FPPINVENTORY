export interface ResourceInfo {
    _id?: string;
    name?: string;
    category?: string;
    supplier?: string;
    unit?: string;
    price?: number;
    stock?: number;
    description?: string;
}

export interface DispatchInfo {
    employeeId: string;
    dispatchId: string;
    employeeFullName: string;
    issueDate: Date;
    expectedReturnDate?: Date;
    productId: string;
    productName: string;
    itemCategory: string;
    quantity: number;
    purpose: string;
    status: string;
  }