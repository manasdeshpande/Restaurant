import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  building: String,
  locality: String,
  sector: String,
  town: String,
  city: String,
  pin: Number
});

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
});

const reservationSchema = new mongoose.Schema({
  table: {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true
    },
    tableNumber: {
      type: String,
      required: true
    }
  },
  user: {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userFirstname: {
      type: String,
    }
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: addressSchema,
  },
  role: {
    type: Number,
    default: 0
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  reservations: [reservationSchema]
}, { timestamps: true });

const Table = mongoose.model('Table', tableSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);
const User = mongoose.model('User', userSchema);

export {User, Table, Reservation}




