import mongoose from 'mongoose';
const { Schema } = mongoose;

const reservationSchema = new Schema({
    name: String,
    phone: String,
    guests: String,
    time: String,
    reservationDate: Date
});

module.exports = mongoose.model('reservation', reservationSchema);
