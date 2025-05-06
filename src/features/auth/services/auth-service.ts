import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const authService = {

  register: async (userData: { email: string; password: string; name: string }) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
      email: userData.email,
      password: hashedPassword,
      name: userData.name
    });

    await user.save();

    const createdUser = user.toObject();
    delete createdUser.password;
    
    return createdUser;
  },


  login: async (email: string, password: string) => {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const authenticatedUser = user.toObject();
    delete authenticatedUser.password;
    
    return authenticatedUser;
  },


  getUserById: async (userId: string) => {
    return User.findById(userId);
  },

 
  updateProfile: async (userId: string, userData: { name?: string; email?: string }) => {
    return User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true, runValidators: true }
    );
  }
};