import mongoose,{Schema} from 'mongoose';

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  eventImage: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Method to add attendee to an event
eventSchema.methods.addAttendee = function (userId) {
  if (!this.attendees.includes(userId)) {
    this.attendees.push(userId);
    this.updatedAt = Date.now();
    return this.save();
  }
  return this;
};

export const Event = mongoose.model('Event', eventSchema);
