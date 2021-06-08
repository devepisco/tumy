const finishServiceDriver = (data, driver) => {
    let infoDriver;
    infoDriver = JSON.parse(data)
    if(infoDriver.length > 0) {
        const arr = infoDriver.filter(function(Driver){
            return Driver.id !== driver.id
        });
        infoDriver = JSON.stringify(arr)
    }else{
        infoDriver = JSON.stringify([])
    }
    return  infoDriver;
}

module.exports = {finishServiceDriver}