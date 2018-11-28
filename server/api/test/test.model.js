'use strict';

import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp'

var TestSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Phone: String,
  Starttime: Date,
  QuestionNumber: [],
  NoOfCorrectAnswer:Number

});
TestSchema.plugin(timestamps, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
//registerEvents(TestSchema);
export default mongoose.model('Test', TestSchema);
