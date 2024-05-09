import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAcessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({
      validateBeforeSave: false,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while genrating the token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, userName, password } = req.body;
  //console.log("user body request from usercontroller.js", req.body);
  if (
    [fullname, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    userName,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if ((!userName && !email) || !password)
    throw new ApiError(400, "Username or password is required");

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User doesn't exist");
  }
  console.log(user.password);
  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("something is wrong", isPasswordValid);
  if (!isPasswordValid) throw new ApiError(400, "Password is not correct");

  const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
    user._id
  );

  const loggedIn = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true, //if we don't secure these cookies it can be edited or modified from frontend. To prevent this, we can secure it through this......
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        { user: loggedIn, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
