export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  deviceId: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  deviceId: string;
}