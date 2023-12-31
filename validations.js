import express from 'express';
import moment from 'moment';



// Validar la longitud del username
function validateUsername(username) {
    if (username.length < 5 || username.length > 15) {
        return {
            isValid: false,
            error: "El username debe tener entre 5 y 15 caracteres."
        };
    }
    return {
        isValid: true
    };
}

// Validar el formato del password
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{5,15}$/;
    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            error: "El password debe ser alfanumérico, contener al menos una letra mayúscula y tener entre 5 y 15 caracteres."
        };
    }
    return {
        isValid: true
    };
}

// Validar el formato del email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            error: "El mail debe tener una estructura de email válida."
        };
    }
    return {
        isValid: true
    };
}

const validateBloodPressure = (systolic, diastolic) => {
    if (systolic <= 0 || diastolic <= 0) {
        console.log("validations:55 - La Sistólica y la Diastólica son menores que 0");
        return {
            isValid: false,
            error: "Los valores de la presión arterial deben ser mayores a 0."
        };
    }
    if (diastolic > systolic) {
        console.log("validations:55 - La Sistólica es menor que la Diastólica");
        return {
            isValid: false,
            error: "La presión diastólica no puede ser mayor que la presión sistólica."
        };
    }
    return {
        isValid: true
    };
}

const validateDate = (date) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    // Validar la fecha utilizando Moment.js
    const dateNew = moment(date, 'DD/MM/YYYY', true);
    const isValidDateFormat = dateRegex.test(date);
    
    if (isValidDateFormat || dateNew.isValid()) {
        return {
            isValid: false,
            error: "La fecha proporcionada no es válida. Debe seguir el formato DD/MM/YYYY."
        };
    }

    const newDate = dateNew.format('YYYY/MM/DD');
    return {
        isValid: true
    };
};


const validateTime = (time) => {
    const timeRegex = /^\d{2}:\d{2}$/;
    const isValidTime = timeRegex.test(time);

    if (!isValidTime) {
        return {
            isValid: false,
            error: "El formato de hora no es válido. Debe ser en el formato HH:MM."
        };
    }

    const [hours, minutes] = time.split(':');
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);

    if (parsedHours < 0 || parsedHours > 23 || parsedMinutes < 0 || parsedMinutes > 59) {
        return {
            isValid: false,
            error: "La hora proporcionada no es válida. Asegúrate de ingresar una hora válida en el formato HH:MM."
        };
    }

    return {
        isValid: true
    };
};

export {
    validateUsername,
    validatePassword,
    validateEmail,
    validateBloodPressure,
    validateDate,
    validateTime
};
