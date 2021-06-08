const editInfoDriver = (data, driver) => {
    let infoDriver;
    let editedInfo = false;
    if(data){
      infoDriver = JSON.parse(data)
      console.log("infoDriver:",infoDriver)
      const arr = infoDriver.map (function (x){ 
        if(x.id == driver.id){ 
          editedInfo = true;
          x = { ...x, ...driver };
        }
        return x;
      });
      if(editedInfo == true){
        infoDriver = JSON.stringify(arr)
      }else{
        infoDriver.push(driver)
        infoDriver = JSON.stringify(infoDriver)
      }
    }else{
      infoDriver = JSON.stringify([driver])
    }
    return  infoDriver;
}
module.exports = { editInfoDriver }