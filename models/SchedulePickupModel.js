const db = require("../config/DBconfig");
const mongoose = require("mongoose");
const WasteScheduleModel = require("../models/WasteScheduleModel");

const { Schema } = mongoose;

const locationSchema = new Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
});

const wasteTypeSchema = new Schema({
    wastetype: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const locationEntrySchema = new Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    WasteType: [wasteTypeSchema],
    ScheduledDate: {
        type: Date,
        required: true,
    },
    ScheduleState: {
        type: String,
        required: true,
    },
    location: locationSchema,

    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WasteCollectionSchedule",
        required: true,
    }
});

const schedulePickupSchema = new Schema({
    area: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collectors", 
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    locations: [locationEntrySchema],
    quantity: {
        Glass: {
            type: Number,
            default: 0
        },
        Plastic: {
            type: Number,
            default: 0
        },
        Paper: {
            type: Number,
            default: 0
        },
        Organic: {
            type: Number,
            default: 0
        },
        Metal: {
            type: Number,
            default: 0
        }
    }
});

schedulePickupSchema.pre("save", async function () {
    try {
        var pickupSchedule = this;
    } catch (error) {
        console.error(error);
    }
});

const SchedulePickupModel = db.model("SchedulePickup", schedulePickupSchema);
module.exports = SchedulePickupModel;