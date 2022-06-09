const indata = {
    "First Name": "name.first",
    "Last Name": "name.last",
    "Email": "email",
    "Phone Number": "phoneNumber",
    "Username": "username",
    "Issued By": "identificationCard.id_name",
    "ID Number": "identificationCard.id_number",
    "Issued Date": "identificationCard.issuedDate",
    "Issued Date": "identificationCard.issuedDate",
    "Expiry Date": "identificationCard.expiryDate"
}

// identificationCard: {
//     id_number: String,
//     issuedDate: Date,
//     expiryDate: Date,
//     id_name: String,
//     photos: [String]
// },

module.exports.convertToMongooseFormat = obj => {
    const tmpobj = {};
    for (const key in obj) {
        tmpobj[indata[key]] = obj[key];
    }
    return tmpobj;
}