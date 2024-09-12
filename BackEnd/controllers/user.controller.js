import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.send("Welcome");
};

// Update User  profile

export const updateUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next(errorHandler(401, "You Can Update Your Profile Only"));
  }

  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (e) {
    next(e);
  }
};
