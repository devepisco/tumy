const finishServiceDriver = (data, idDriver) => {
    let infoDriver;
    infoDriver = JSON.parse(data)
    if(infoDriver) {
        const arr = infoDriver.filter(function(Driver){
            return Driver.id !== idDriver
        });
        infoDriver = JSON.stringify(arr)
    }else{
        infoDriver = JSON.stringify([])
    }
    return  infoDriver;
}

module.exports = {finishServiceDriver}