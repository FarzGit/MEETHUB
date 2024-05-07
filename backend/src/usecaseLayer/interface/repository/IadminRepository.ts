
import { IAdmin } from "../../../domain/admin";


export interface IadminRepository{
    findAdmin(email: string): Promise<IAdmin | null>;
}