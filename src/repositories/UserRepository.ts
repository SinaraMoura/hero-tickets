import { User } from '../entities/User';

export interface UserRepository {
    add(user: User): Promise<User>;
    verifyIsUserExists(email: string): Promise<any>;
}