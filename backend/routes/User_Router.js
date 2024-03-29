import { UserModal } from '../model/User_model.js'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/user/UserRegister', async (req, res) => {
    const { name, email, password } = req.body
    const wallet = 0
    let AlreadyExist = await UserModal.findOne({ email })
    if (AlreadyExist) {
        res.json({ message: "user Already Exists" })
    }
    else {
        const hashedPassword = bcrypt.hashSync(password, 10)
        let user
        try {

            const newuser = await new UserModal({ name, email, password: hashedPassword, wallet })
            user = await newuser.save()
        } catch (err) {
            console.log("cant register")
        }

        if (user) {
            return res.json({ message: "user registered successfully" })
        }
        return res.json({ message: "couldn't register" })
    }
}
)

router.post('/LoginUser', async (req, res) => {

    const { email, password } = req.body
    let user
    try {
        user = await UserModal.findOne({ email })
    } catch (err) {
        console.log("cant Login")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        console.log("hello")
        return res.status(200).send({ message: 'Login Failed' });
    }
    else {
        if (user) {
            const token = jwt.sign({ id: user._id }, "secret")
            res.json({ token, user })
        }
        else {
            return res.json({ message: "Login Failed" })

        }
    }
}
)

router.get('/all', async (req, res) => {
    let user
    try {

        user = await UserModal.find({})
    } catch (err) {
        console.log("cant get users")
    }

    if (user) {
        return res.json(user)
    }
    else {
        return res.status(400).json({ message: "Login Failed" })

    }
}
)

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const userId = await UserModal.findById(id);
        if (userId) {
            return res.json(userId);
        }
    } catch (err) {
        console.log("Couldn't get the user of specified id", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/update/users/:id', async (req, res) => {
    const id = req.params.id;
    const { wallet } = req.body;

    try {
        const updatedUser = await UserModal.findByIdAndUpdate({ _id: id }, { wallet: wallet });
        if (updatedUser) {
            return res.json({ message: "Successfully updated", user: updatedUser });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/Message/:id', async (req, res) => {
    const id = req.params.id
    const { message } = req.body

    try {
        const userMessage = await UserModal.findByIdAndUpdate({ _id: id }, { message: message })
        if (userMessage) {
            return res.json({ message: "Successfully Send" });
        } else {
            return res.status(404).json({ message: "Couldnt Send Message" });
        }
    } catch (error) {
        console.error("Error sending message", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})
export { router as UserRouter }


