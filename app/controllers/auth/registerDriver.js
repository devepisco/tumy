const registerDriverTemplate = require('../../models/Driver')

const registerDriver = (req , res)=> {
    const registeredDriver = new registerDriverTemplate({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        typeID:req.body.typeID,
        numID:req.body.numID,
        numSOAT:req.body.numSOAT,
        numPlaca:req.body.numPlaca,
        numTarjetaPropiedad:req.body.numTarjetaPropiedad,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        profilePicture:req.file.filename,
    })
    registeredDriver.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
};

module.exports = { registerDriver }