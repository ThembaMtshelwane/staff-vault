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
