declare namespace Express {
  export interface User {
    sub: string | number;
    role: UserRole;
  }
}
