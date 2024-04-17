const jwt = require("jsonwebtoken")
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user, expiresIn: 60 * 60 * 24 }); // Set expiry time to one day (in seconds)
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

const createJWT = ({ payload, expiresIn }) => {
  return jwt.sign(payload, 'trial', { expiresIn });
};

// Verify the token
const isTokenValid = ({ token }) => jwt.verify(token, 'trial')

// const attachCookiesToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user, expiresIn: '1d' })
//   const oneDay = 1000 * 60 * 60 * 24
//   //   res.cookie('name', value, [option]), option = httpOnly, expires
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   })
// }

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
}
