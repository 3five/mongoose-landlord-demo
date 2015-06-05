var mongoose = require('../services/mongoose')
var landlord = require('mongoose-landlord')


var TenantSchema = new mongoose.Schema({
  address: String
})

var Tenant = mongoose.model('Tenant', TenantSchema)

var PersonSchema = new mongoose.Schema({
  name: String,
  age: Number,
  alive: Boolean
}).plugin(new landlord.Landlord({
  tenant: 'Tenant',
  mongooseInstance: mongoose
}))

var Person = mongoose.model('Person', PersonSchema)

var MessageSchema = new mongoose.Schema({
  body: String,
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }
}).plugin(new landlord.Landlord({
  tenant: 'Tenant',
  mongooseInstance: mongoose
}))

var Message = mongoose.model('Message', MessageSchema);

module.exports.Tenant = Tenant;
module.exports.TenantSchema = TenantSchema;
module.exports.Person = Person;
module.exports.PersonSchema = PersonSchema;
module.exports.Message = Message;
module.exports.MessageSchema = MessageSchema;


Tenant.count().then(function(count) {
  if (count === 0) {
    Tenant.create([
      { address: 'tenant-a.shopdev' },
      { address: 'tenant-b.shopdev' }
    ])
  }
})