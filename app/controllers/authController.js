import db from "../../config/dbConfig.js";
import { AUTH_CODE } from "../../config/enum.js";
import jsonwebtoken from "jsonwebtoken";

export const registerUserRequest = (req, res) => {
  const payload = req.body;

  db.query('CALL InsertUser(?, ?, ?, ?)', [
    payload.email,
    payload.password,
    payload.firstName,
    payload.lastName,
  ], (error, results) => {
    if (error) {
      console.error('Error calling the stored procedure:', error);
      res.status(500).json({ error: 'An error occurred', code: AUTH_CODE.FAILURE_CODE });
      return;
    }

    const result = results[0][0].Result;

    if (result === 'Email already exists') {
      res.status(400).json({ error: 'Email already exists' });
    } else if (result === 'User inserted successfully') {
      const generatedVerificationCode = results[0][0].GeneratedVerificationCode;
      res.status(200).json({ success: { message: 'User inserted successfully', code: AUTH_CODE.SUCCESS_CODE }, verificationCode: generatedVerificationCode });

    }
  });
};

export const loginUserRequest = (req, res) => {
  const loginData = req.body;
  db.query('CALL VerifyUser(?, ?)', [loginData.email, loginData.password], (error, results) => {
    if (error) {
      console.error('Error calling the stored procedure:', error);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    const isVerified = results[0][0].IsVerified;
    const emailId = results[0][0].UserEmail;
    const firstName = results[0][0].UserFirstName;
    const lastName = results[0][0].UserLastName;
    const token = jsonwebtoken.sign(
      { emailId },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    if (isVerified === 1) {
      res.status(200).json({
        success: { message: 'Login successful', code: AUTH_CODE.SUCCESS_CODE },
        emailId: loginData.email,
        firstName: firstName,
        lastName:lastName,
        token: token
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials', code: AUTH_CODE.FAILURE_CODE });
    }
  });
};


export const profileRequest = (req, res) => {
  const userData = req.body;
  const sqlQuery = 'select * from users where UserEmail = ?'
  db.query(sqlQuery, [userData.email], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    if (results[0] && JSON.parse(JSON.stringify(results[0]))) {
      res.status(200).json({
        success: { message: 'Login successful', code: AUTH_CODE.SUCCESS_CODE },
        customerDetails: JSON.parse(JSON.stringify(results[0]))
      });
    } else {
      res.status(401).json({ error: 'User failed', code: AUTH_CODE.FAILURE_CODE });
    }

  });
}


export const addressUpdateOrInsertRequest = (req, res) => {

  try {
    const addressNameInput = req.body.addressNameINPUT;
    const userEmailAddress = req.body.userEmailAddress;
    const addressIdUpdate = req.body.addressIdUpdate;
    const houseNumber = req.body.houseNumber;
    const streetName = req.body.streetName;
    const landmark = req.body.landmark;
    const mobileNumber = req.body.mobileNumber;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const pincode = req.body.pincode;
    const defaultAddress = req.body.defaultAddress;

    db.query('CALL UpdateOrInsertAddress(?,? , ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
      [userEmailAddress, addressIdUpdate, addressNameInput, houseNumber, streetName, landmark, mobileNumber, city, state, country, pincode, defaultAddress], (error, results) => {
        if (error) {
          console.error('Error calling the stored procedure:', error);
          res.status(500).json({ error: 'An error occurred' });
          return;
        }

        res.status(200).json({success: { message: results[0][0].Result , code: AUTH_CODE.SUCCESS_CODE } });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });

  }

}


export const allAddressRequest = (req, res) => {
  try {
    const userData = req.body;
    const sqlQuery = 'CALL UserAllAddress(?)'
    db.query(sqlQuery, [userData.email], (error, results) => {
      if (error) {
        console.error('Error calling the stored procedure:', error);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
      if (results[0][0].Result === 'No addresses found for the user') {
        res.status(200).json({ error: results[0][0].Result, result: null });
      } else {
        res.status(200).json({success: { message: 'Address available', code: AUTH_CODE.SUCCESS_CODE }, availableAddress: JSON.parse(JSON.stringify(results[0])) });
      }

    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const verifyRequest = (req, res) => {
  res.status(200).json({success: { message: 'verified', code: AUTH_CODE.SUCCESS_CODE } });
}