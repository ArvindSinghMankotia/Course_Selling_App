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


export const courseInput = zod.object({
  title : zod.string().nonempty({message:"Title is required"}),
  description : zod.string().nonempty({message:"Description is required"}),
  price : zod.number().min(0,{message :"The price is required"}),
  imageUrl :zod.string().optional()
})