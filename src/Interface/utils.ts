export interface sign {}
export interface tokens {
  error: any;
  token: string;
}
export interface sercurDataSign {
  userId: string;
  email: string;
  type: string;
  role: string;
  // rand?: string;
}

export interface updateData {
  userId: string;
  token: string;
  expires: string;
  type: string;
  // rand?: string;
}
