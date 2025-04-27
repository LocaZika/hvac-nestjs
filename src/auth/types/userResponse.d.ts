import { User } from '@modules/user/entities/user.entity';

interface ILoginResponse {
  user: Partial<User>;
  access_token: string;
}

interface IVerifyUserResponse {
  id: number;
  name: string;
  email: string;
}
