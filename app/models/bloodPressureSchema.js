import mongoose from 'mongoose';

const bloodPressureSchema = new mongoose.Schema({
    systolic: {
        type: Number,
        required: true,
    },
    diastolic: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
});

bloodPressureSchema.index({
    systolic: 1,
    diastolic: 1,
    date: 1,
});


const Blood = mongoose.model('bloodPressure', bloodPressureSchema);

export default Blood;
