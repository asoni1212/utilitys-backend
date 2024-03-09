import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = 'your-secret-key';

const auth = {
  generateToken: (user) => {
    return jsonwebtoken.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  },
  verifyToken: (token) => {
    return jsonwebtoken.verify(token, SECRET_KEY);
  }
};

export default auth;