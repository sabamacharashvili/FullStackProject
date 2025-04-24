import User from "../models/user.js";

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

    const user = new User({
      name: username,
      email,
      password: password,
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
    const { email, password } = req.body; // 'email' field is expected

    // Checking if both fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "შეავსეთ ყველა ველი" });
    }

    // Finding user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "მეილი არასწორია" });
    }

    // Checking if the password matches the one in the database
    if (password !== existingUser.password) {
      return res
        .status(400)
        .json({ success: false, message: "პაროლი არასწორია" });
    }

    // If login is successful
    res
      .status(200)
      .json({ success: true, message: "თქვენ წარმატებით შეხვდით!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "სერვერის შეცდომა" });
  }
};
