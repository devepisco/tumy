const finishServiceDriver = (data, driver) => {
    let infoDriver;
    if(data){
        infoDriver = JSON.parse(data)
        const arr = infoDriver.filter(function(Driver){
            return Driver.id !== driver.id
        });
        infoDriver = JSON.stringify(arr)
    }else{
        infoDriver = JSON.stringify([driver])
    }
    return  infoDriver;
}

module.exports = {finishServiceDriver}