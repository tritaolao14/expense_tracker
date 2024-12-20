const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  //console.log(req.headers);

  //In ra payload cua token do (decrypt), cung voi secret trong .env
  try {
    //Trong headers, chi lay token, xoa di "Bearer" o dau
    //accessToken nen o trong khoi try-catch, khong the hien thi 400 vi khong phai bad request
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const JWT_payload = jwt.verify(accessToken, process.env.jwt_salt);

    //gan JWT_payload cho req.user
    //co the kiem tra trong userDashboard(duoc dinh nghia sau auth trong app)
    req.user = JWT_payload;
  } catch (e) {
    //401 unauthorize
    res.status(401).json({
      status: "failed",
      message: "Unauthorized!",
    });
    return;
  }
  next();
};
module.exports = auth;
