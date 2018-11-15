import mongoose from 'mongoose';

let  Schema = mongoose.Schema;
let agentSchema = new Schema({
    systemGuid:{ type:String, required:true},
    PCName:{ type:String, required:true},
    lastCheckin:{ type:Date, required:true},
    isActive:{ type:Boolean, required:true},
    cNumber:{ type:String, required:true}
});

export default mongoose.model('agent', agentSchema);
