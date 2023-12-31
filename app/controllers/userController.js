import User from '../models/userSchema.js';
import { validateUsername, validatePassword, validateEmail } from '../../validations.js';

const getUsers = async (req, res) => {
    let success = 300;
    try {
        const users = await User.find(); // Usa el modelo de usuario para buscar usuarios
        res.status(200).json(users);
        success = 200;
    } catch (error) {
        //res.status(500).json({ message: error.message });
        success = 500;
    }
    return success;
};

const getUserByUsername = async (req, res) => {
    let success = 300;
    try {
        const user = req.session.username;
        const username = await User.findOne({ user }); // Usa el modelo de usuario para buscar el usuario
        if (username) {
            //res.status(200).json(user);
            success = 200;
        } else {
            //res.status(404).json({ message: 'Usuario no encontrado' });
            success = 400;
        }
    } catch (error) {
        //res.status(500).json({ message: error.message });
        success = 500;
    }
    return success;
}; 

const createUser = async (req, res) => {
    let success = 300;
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            success = 400;
            //return res.status(400).json({ error: "Faltan campos obligatorios del usuario." });
            
        }
        const usernameValidation = validateUsername(username);
        if (!usernameValidation.isValid) {
            success = 500;
            //return res.status(400).json({ error: usernameValidation.error });
        }
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            success = 400;
            //return res.status(400).json({ error: passwordValidation.error });
        }
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            success = 400;
            //return res.status(400).json({ error: emailValidation.error });
        }
        const newUser = new User({ username, password, email }); // Crea un nuevo usuario
        await newUser.save(); // Guarda el usuario en la base de datos
        //al conectar con el front no se envía este res.status
        //res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
        success = 200;
    } catch (error) {
        success = 500;
        //res.status(500).json({ message: error.message });
    }
    console.log(success);
    return success;
};

const updateUser = async (req, res) => {
    let success = 300;
    try {
        const user = req.session.username;
        const { password, email } = req.body;
        const username = await User.findOne({ user }); // Usa el modelo de usuario para buscar el usuario
        if (!username) {
            //return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }

        if (password) {
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.isValid) {
                //return res.status(404).json({ error: passwordValidation.error });
                success = 400;
            }
            username.password = password;
        }

        if (email) {
            const emailValidation = validateEmail(email);
            if (!emailValidation.isValid) {
                //return res.status(404).json({ error: emailValidation.error });
                success = 400;
            }
            username.email = email;
        }

        await username.save();
        //user.save();
        //al conectar con el front no se envía este res.status
        //res.json({ message: "Usuario actualizado con éxito", user });
        success = 200;
    } catch (error) {
        //res.status(500).json({ message: error.message });
        success = 500;
    }
    return success;
};

const deleteUser = async (req, res) => {
    let success = 300;
    try {
        const user = req.session.username;

        const username = await User.findOneAndDelete({ user });
        if (!username) {
            //return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }

        //res.json({ message: "Usuario eliminado con éxito", user });
        success = 200;
    } catch (error) {
        //res.status(500).json({ message: error.message });
        success = 500;
    }
    return success;
};

export { 
    getUsers, 
    getUserByUsername, 
    createUser, 
    updateUser, 
    deleteUser 
}