import bcryptjs from "bcryptjs";

export async function verifyPassword(inputpassword, UserPassword) {
  try {
    const result = await bcryptjs.compare(inputpassword, UserPassword);
    return result;
  } catch (error) {
    console.error("Error verifying password:", error.message);
    return false;
  }
}
