import db from "../../config/dbConfig.js";
import bcryptjs from "bcryptjs";

class UserModel {
    
    static async createUser(input) {
        const hashedPassword = await bcryptjs.hash(input.password , 10);
        return await new Promise((resolve, reject) => {
            try {
               
                console.log(hashedPassword)
                // Implement logic to call the stored procedure `InsertUser`
           db.query('CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  [
                    input.email, hashedPassword, input.firstName, input.lastName,
                    input.city, input.state, input.zip, input.country,
                    input.address, input.address2
                  ], (error, results) => {
                    const finalResult = results? results[0][0]: results;
                    if (finalResult?.Error|| error) {
                        reject(new Error (finalResult?.Error|| error) );
                      } else {                    
                        resolve(finalResult);
                      }
                  });
              } catch (error) {
                throw new Error(error.message);
              }
        });       
      }
    
      static async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM users WHERE UserEmail = ?';
          db.query(sql, [email], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const user = results[0];
              resolve(JSON.parse(JSON.stringify(user)));
            }
          });
        });
      }

    static async getUserById(id) {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM users WHERE UserID = ?';
          console.log("inside")
          db.query(sql, [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const user = results[0];
              resolve(JSON.parse(JSON.stringify(user)));
            }
          });
        });
      }
}

export default UserModel;
