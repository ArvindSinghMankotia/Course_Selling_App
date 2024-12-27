import zod from "zod";
export const SignupIntput = zod.object({
  FirstName: zod.string().nonempty({ message: "First name is required" }),
  LastName: zod.string().nonempty({ message: "Last name is required" }),
  Email: zod.string().email({ message: "Invalid email address" }),
  Password: zod.string().min(8, { message: " The password is to small " }),
});

export const logininput = zod.object({
  Email: zod.string().email({ message: "Invalid email adress" }),
  Password: zod.string(),
});
