function(doc) {
  if (doc.type==="musician") {
    emit(doc._id, {
    	"id":doc._id,
    	"rev":doc._rev,
    "fname": doc.fname,
    "lname": doc.lname,
    "instr": doc.instr,
    "phone": doc.phone,
    "notes": doc.notes
    });
  }
};