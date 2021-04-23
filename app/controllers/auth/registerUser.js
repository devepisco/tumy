const registerUserTemplate = require('../../models/User')

const registerUser = (req , res)=> {
    const registeredUser = new registerUserTemplate({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        typeID:req.body.typeID,
        numID:req.body.numID,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password        
    })
    registeredUser.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
};

module.exports = { registerUser }