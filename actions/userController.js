"use server";

import { getCollection } from "../lib/db";

const isAlphaNumeric = (str) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(str);
};

export const register = async (prevState, formData) => {
  const errors = {};

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof ourUser.username !== "string") ourUser.username = "";
  if (typeof ourUser.password !== "string") ourUser.password = "";

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  if (ourUser.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }
  if (ourUser.username.length > 30) {
    errors.username = "Username cannot exceed 30 characters";
  }
  if (!isAlphaNumeric(ourUser.username)) {
    errors.username = "Username can only contain letters and numbers";
  }
  if (ourUser.username === "") {
    errors.username = "Username is required";
  }

  if (ourUser.password.length < 5) {
    errors.password = "Password must be at least 5 characters";
  }
  if (ourUser.password.length > 50) {
    errors.password = "Password cannot exceed 50 characters";
  }
  if (ourUser.password === "") {
    errors.password = "Password is required";
  }

  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false,
    };
  }

  // Save user to database
  const userCollection = await getCollection("users");
  await userCollection.insertOne(ourUser);

  // log the user in by giving them a cookie

  return {
    success: true,
  };
};
