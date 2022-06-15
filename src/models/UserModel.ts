import { model, Model, Schema } from 'mongoose'
import { User } from '../interfaces/User'

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const UserModel: Model<User> = model('users', UserSchema)

export default UserModel