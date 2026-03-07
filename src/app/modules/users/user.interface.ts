export type TUser = {              
  name: string;
  email:string;
  role:'admin' | 'viewer'
  password:string;
  createdAt?: Date;
  updatedAt?: Date;
}