import jwt from "jsonwebtoken"

const generateToken = (email, password, res) => {
    const token = jwt.sign(
        {
            email,
            password,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("JWT_TOKEN", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "None", // Allows cross-origin requests to clear cookies
        secure: process.env.NODE_ENV === "development",
    });

    return token;
}

export { generateToken };