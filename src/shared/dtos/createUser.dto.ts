export interface createUserDTO {
  name: string;
  birthdate: string;
  countryId?: number;
  email: string;
  password: string;
  confirmPassword: string;
}
