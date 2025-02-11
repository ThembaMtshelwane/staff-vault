export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role: string;
  permissions: string[];
  files?: string[];
}

export interface IDepartment {
  _id: string;
  name: string;
  email: string;
  staff: string[];
}

export interface IDepartmentInput {
  name: string;
  email: string;
}
