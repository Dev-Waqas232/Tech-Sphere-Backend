import jwt, { JwtPayload } from "jsonwebtoken";

const generateToken = (id: string, isAdmin: boolean) => {
  const token = jwt.sign({ id, isAdmin }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return decode.id;
  } catch (error) {
    return null;
  }
};

const decodeAdmin = (token: string) => {
  try {
    const decode = jwt.decode(token) as JwtPayload;
    return decode.isAdmin;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken, decodeAdmin };
