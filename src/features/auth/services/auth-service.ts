import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const authService = {
  /**
   * Register a new user
   */
  register: async (userData: { email: string; password: string; name: string }) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user
    const user = new User({
      email: userData.email,
      password: hashedPassword,
      name: userData.name
    });

    await user.save();

    // Return user without password
    const createdUser = user.toObject();
    delete createdUser.password;
    
    return createdUser;
  },

  /**
   * Authenticate a user
   */
  login: async (email: string, password: string) => {
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    // Return user without password
    const authenticatedUser = user.toObject();
    delete authenticatedUser.password;
    
    return authenticatedUser;
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId: string) => {
    return User.findById(userId);
  },

  /**
   * Update user profile
   */
  updateProfile: async (userId: string, userData: { name?: string; email?: string }) => {
    return User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true, runValidators: true }
    );
  }
};