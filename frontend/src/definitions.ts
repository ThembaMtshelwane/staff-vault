export interface IFiles {
  image: string;
  docs: string[];
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role: string;
  permissions: string[];
  files: IFiles;
  department?: string;
  supervisor?: string;
}

export interface IDepartment {
  _id: string;
  name: string;
  positions: string[];
  supervisor: string;
}

export interface IDepartmentInput {
  name: string;
  email: string;
}

export interface IOrganization {
  _id: string;
  name: string;
  description: string;
  registrationNumber: string;
  admin: string;
  address: string;
  phone: string;
  email: string;
}
