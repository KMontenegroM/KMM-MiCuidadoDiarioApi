import mongoose from 'mongoose';

// Definición del esquema de la colección Higiene
const checklistHCSchema = new mongoose.Schema({
    HCquestion1: {
        type: Boolean,
        required: true,
    },
    HCquestion2: {
        type: Boolean,
        required: true,
    },
    HCquestion3: {
        type: Boolean,
        required: true,
    },
    HCquestion4: {
        type: Boolean,
        required: true,
    },
    HCquestion5: {
        type: Boolean,
        required: true,
    },
    HCquestion6: {
        type: Boolean,
        required: true,
    },
    HCquestion7: {
        type: Boolean,
        required: true,
    },
    HCquestion8: {
        type: Boolean,
        required: true,
    },
    HCquestion9: {
        type: Boolean,
        required: true,
    },
    HCquestion10: {
        type: Boolean,
        required: true,
    },
    HCquestion11: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        required: true
    }
});

// Definición del esquema de la colección Ánimo
const checklistEASchema = new mongoose.Schema({
    EAquestion1:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion2:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion3:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion4:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion5:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion6:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion7:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion8:{
        type: Boolean,
        //type: String,
        required: true,
    },
    EAquestion9:{
        type: Boolean,
        //type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        required: true
    }
});


const checkHC = mongoose.model('ChecklistHC', checklistHCSchema);

const checkEA = mongoose.model('ChecklistEA', checklistEASchema);

export {checkHC, checkEA};

