const { z } = require('zod');

const signUpSchema = z.object({
    firstName: z.string().refine(data => data.trim() !== '', { message: "Please provide a valid first name." }),
    lastName: z.string().refine(data => data.trim() !== '', { message: "Please provide a valid last name." }),
    email: z.string().email({ message: "Please provide a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

const validateUser = (req, res, next) => {
    try {
        const { success } = signUpSchema.safeParse(req.body)
        if (!success) {
            throw new Error("Email already taken / Incorrect inputs");
        }
        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};

module.exports = validateUser;
