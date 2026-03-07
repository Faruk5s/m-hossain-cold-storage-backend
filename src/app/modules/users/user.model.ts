import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcryptjs'

const userSchema = new Schema<TUser>(
  {
    
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:false,
    },
    role: {
      type: String,
      enum: ['admin','viewer'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    return next();
  }

  const saltRounds = 10;

  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

export const UserModel = model<TUser>('User', userSchema);
