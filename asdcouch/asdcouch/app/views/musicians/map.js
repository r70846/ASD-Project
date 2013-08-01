function(doc) {
  if (doc.type==="musician") {
    emit(doc._id, {
    "fname": doc.fname,
    "lname": doc.lname,
    "instr": doc.instr,
    "phone": doc.phone,
    "notes": doc.notes
    });
  }
};