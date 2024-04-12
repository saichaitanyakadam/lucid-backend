import { User } from "../models/user.model.js";

const userRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(409).send("user already exists with same username");
    }

    const user = await User.create({
      username,
      password,
    });
    if (!user) res.status(500).json({ message: "Something went wrong" });
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    res.status(404).json({
      message: "User doesn't exist",
    });
  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    res.status(401).json({
      message: "Please Enter Valid Password",
    });
  }
  const accessToken = await user.generateAccessToken();
  if (!accessToken)
    res.status(500).json({
      message: "Something went wrong",
    });
  res.status(200).send(accessToken);
};

export { userRegister, userLogin };
