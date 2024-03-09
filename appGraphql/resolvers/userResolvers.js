import bcryptjs from "bcryptjs";
import UserModel from "../models/userModel.js";
import auth from "../utils/auth.js";
import { getAllUserData } from "../../app/controllers/userController.js";
import db from "../../config/dbConfig.js";

const userResolvers = {
  Query: {
    getUser: async (_ , { id }) => {
      try {
        console.log("inside")
        const user = await UserModel.getUserById(id);
        console.log("inside")
        return {id: user.UserID,email: user.UserEmail, password: user.UserPassword,firstName: user.UserFirstName,
            lastName: user.UserLastName,city: user.UserCity,state: user.UserState,zip: user.UserZip,
            emailVarified: user.UserEmailVerified,registrationDate: user.UserRegistrationDate,
            varificationCode: user.UserVerificationCode,ip: user.UserIP,phone: user.UserPhone,fax: user.UserFax,
            country: user.UserCountry,address: user.UserAddress,address2: user.UserAddress2};
      } catch (error) {
         console.log(error);
      }
    }
  },
  Mutation: {
    registerUser:async (_, { input }) => {
        try {
          // Call the UserModel's insertUser method
          const generatedVerificationCode = await UserModel.createUser(input);
          return {
            message: generatedVerificationCode.Result,
            verificationCode: generatedVerificationCode.GeneratedVerificationCode
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    loginUser: async (_, { email, password }) => {
      try {
        // Fetch user by email
        const user = await UserModel.getUserByEmail(email);

        if (!user) {
          throw new Error('User not found');
        }

        // Compare passwords
        const passwordMatch = await bcryptjs.compare(password, user.UserPassword);
        if (!passwordMatch) {
          throw new Error('Invalid password');
        }
       
        // Generate token
        const token = auth.generateToken(user);
       
        return {id: user.UserID,email: user.UserEmail, password: user.UserPassword,firstName: user.UserFirstName,
                lastName: user.UserLastName,city: user.UserCity,state: user.UserState,zip: user.UserZip,
                emailVarified: user.UserEmailVerified,registrationDate: user.UserRegistrationDate,
                varificationCode: user.UserVerificationCode,ip: user.UserIP,phone: user.UserPhone,fax: user.UserFax,
                country: user.UserCountry,address: user.UserAddress,address2: user.UserAddress2};
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

export default userResolvers;
