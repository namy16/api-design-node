import mongoose from 'mongoose';

let  Schema = mongoose.Schema;

let depSchema = new Schema({
  description:{ type:String, required:true},
  active:{ type:Boolean, required:true},
  agentCount:{ type:Number, required:true},
  agentIssues:{ type:Boolean, required:true},
  id:{ type:String, required:true},
  softwareGuid:{ type:String, required:true},
  phase:{ type:Number, required:true},
  packageName:{ type:String, required:true},
  installedPCs:{ type:Number, required:true},
  totalPCs:{ type:Number, required:true},
  agents: [{type: Schema.Types.ObjectId, ref: 'agent'}]
});

export default mongoose.model('deployment', depSchema);
