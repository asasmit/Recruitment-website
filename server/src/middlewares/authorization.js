import pkg from 'jsonwebtoken';
const { verify } = pkg;

const authorization = (req, res, next) => {
  const token = req.header('Auth-Token');
  if (!token) return res.status(401).send({ message: 'Access denied.' });

  try {
    const verified = verify(token, 'asmittt');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token.' });
  }
};

export default authorization;
