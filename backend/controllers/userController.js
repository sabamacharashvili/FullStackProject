import User from "../models/user.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "შეავსეთ ყველა ველი" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "ასეთი მეილი უკვე დარეგისტრირებულია",
      });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "წარმატებით გაიარეთ რეგისტრაცია" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "შეავსეთ ყველა ველი" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "მეილი არასწორია" });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "პაროლი არასწორია" });
    }

    res
      .status(200)
      .json({ success: true, message: "თქვენ წარმატებით შეხვედით!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
};
