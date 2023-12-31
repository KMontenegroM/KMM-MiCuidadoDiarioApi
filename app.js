import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import userRoutes from './app/routes/userRoutes.js';
import authRoutes from './app/routes/authRoutes.js';
import checkRouter from './app/routes/checkListRoutes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { connectDB } from './config/database.js'; // Importa connectDB desde database.js
import { createUser } from './app/controllers/userController.js'; // Importa createUser
import { loginUser } from './app/controllers/authController.js'; // Importa loginUser
import { createBloodPressure } from './app/controllers/bloodPressureController.js'; // Importa createBloodPressure
import { createCheckListHigiene } from './app/controllers/checkListController.js'; // Importa createCheckListHigiene
import { createCheckListEAnimo } from './app/controllers/checkListController.js'; // Importa createCheckListEAnimo


const app = express();
const port = process.env.PORT || 3002;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Configurar body-parser para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configura el middleware de sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

connectDB(); // Conecta a la base de datos

dotenv.config();

app.use(express.static('public'));

//conexión al frontend
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/home.html");
    res.sendFile(filePath);
});

app.use('/users', userRoutes);

app.get("/404", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/404.html");
    res.sendFile(filePath);
});

app.get("/500", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/500.html");
    res.sendFile(filePath);
});


app.get("/register", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/register.html");
    res.sendFile(filePath);
});

app.post("/createUser", async (req, res) => {
    const success = await createUser(req, res);
        if (success===200) {
            // Redirige a la página de inicio de sesión porque el status es 200
            res.redirect(303, "/login");
        } else if (success===400) {
            // Redirige a la página de error 404 porque el status es 400
            res.redirect(303, "/404");
        } else {
            // Redirige a la página de error 500 porque el status es 500
            res.redirect(303, "/500");
        }
});

app.use('/users', authRoutes);

app.get("/login", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/login.html");
    res.sendFile(filePath);
});

app.post("/loginUser", async (req, res) => {
    const { loginUsername, success } = await loginUser(req, res);
    console.log("app.js", success);
    console.log("app.js", loginUsername);
    if (success === 200) {
        res.cookie("loginUsername", loginUsername); // Almacena el valor en una cookie
    }
    if (success===200) {
        // Redirige a la página del checklist porque el status es 200
        res.redirect(303,"/checkList");
    } else if (success===400) {
        // Redirige a la página de error 404 porque el status es 400
        res.redirect(303, "/404");
    } else {
        // Redirige a la página de error 500 porque el status es 500
        res.redirect(303, "/500");
    }
});

app.use('/checklist', checkRouter);

app.get("/checkList", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/checkList.html");
    res.sendFile(filePath);
});

app.get("/record", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/record.html");
    res.sendFile(filePath);
});

app.get("/returnCheckListPA", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/returnCheckListPA.html");
    res.sendFile(filePath);
});

app.get("/404PA", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/404PA.html");
    res.sendFile(filePath);
});

app.post("/createBloodPressure", async (req, res) => {
    const success = await createBloodPressure(req, res);
    console.log(success);
    if (success===200) {
        // Redirige a la página del mensaje de "Presión Arterial cargado con éxito" porque el status es 200
        res.redirect(303, "/returnCheckListPA");
    } else if (success===410) {
        // Redirige a la página de error404PA
        res.redirect(303, "/404PA");
    } else if (success===400) {
        // Redirige a la página de error 404 porque el status es 400
        res.redirect(303, "/404");
    } else {
        // Redirige a la página de error 500 porque el status es 500
        res.redirect(303, "/500");
    }
});

app.get("/checkListHC", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/checkListHC.html");
    res.sendFile(filePath);
});

app.get("/checkListEA", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/checkListEA.html");
    res.sendFile(filePath);
});

app.get("/returnCheckListHC", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/returnCheckListHC.html");
    res.sendFile(filePath);
});

app.post("/createCheckListHigiene", async (req, res) => {
    const success = await createCheckListHigiene(req, res);
    if (success===200) {
        // Redirige a la página del mensaje de "Higiene y Confort" cargado con éxito" porque el status es 200
        res.redirect(303,"/returnCheckListHC");
    } else if (success===400) {
        // Redirige a la página de error 404 porque el status es 400
        res.redirect(303, "/404");
    } else {
        // Redirige a la página de error 500 porque el status es 500
        res.redirect(303, "/500");
    }
});

app.get("/returnCheckListEA", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/returnCheckListEA.html");
    res.sendFile(filePath);
});

app.post("/createCheckListEAnimo", async (req, res) => {
    const success = await createCheckListEAnimo(req, res);
    if (success===200) {
        // Redirige a la página del mensaje de "Estado de Ánimo cargado con éxito" porque el status es 200
        res.redirect(303,"/returnCheckListEA");
    } else if (success===400) {
        // Redirige a la página de error 404 porque el status es 400
        res.redirect(303, "/404");
    } else {
        // Redirige a la página de error 500 porque el status es 500
        res.redirect(303, "/500");
    }
});

//Servidor
app.listen(port, () => {
    console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
