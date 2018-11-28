'use strict';

import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp'
var QuestionpoolSchema = new mongoose.Schema({
  QuestionNo: Number,
  Category:String,
  type:String,
  Question: String,
  Options:Array
});
QuestionpoolSchema.plugin(timestamps,  {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
export default mongoose.model('Questionpool', QuestionpoolSchema);
