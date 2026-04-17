export type PhoneType = 'mobile' | 'landline' | 'whatsapp';

export type User = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
};

export type UserFormValue = Omit<User, 'id'>;
