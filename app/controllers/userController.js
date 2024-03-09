import db from "../../config/dbConfig.js";

export const getUserDataByID = (req, res) => {
    const userEmail = req.body.UserEmail;
    const sql = 'SELECT * FROM users WHERE UserEmail = ?';
    db.query(sql, [userEmail], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving user profile');
        }

        const user = results[0];
        return res.json(user)
    });
};

export const getAllUserData = (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    });
};

export const test = (req, res) => {
    // const q = "SELECT * FROM users"
    // db.query(q, (err, data) => {
    //     if (err) return res.json(err);
    //     return res.json(data)
    // });
    return "hello";
};