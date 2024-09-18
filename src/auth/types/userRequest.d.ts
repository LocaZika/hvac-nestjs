import { UserEntity } from '@/global/userEntity';

/** Declare type for user */
type TUser = UserEntity;

/** Override user type in Express.Request */
interface IExpressRequest extends Express.Request {
  user?: User | TUser | undefined;
}
