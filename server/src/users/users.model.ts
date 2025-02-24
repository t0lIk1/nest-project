import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRoles} from "../roles/user-roles.model";
import {Role} from "../roles/roles.model";

interface UserCreationAttributes {
    email: string;
    password: string;
}


@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({example: '1', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    declare id: number;

    @ApiProperty({example: 'user@gmail.com', description: 'unique email address'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'user!2sadPassword', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'false', description: 'Not banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'user not admin', description: 'ban description'})
    @Column({type: DataType.STRING, allowNull: true,})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}