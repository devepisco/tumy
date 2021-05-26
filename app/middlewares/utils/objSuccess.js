const objSuccess = (data={},message="")=>{
    if(data.length > 1 && !message) message = "Resultados obtenidos: " + data.length ;
    else if(data.length == 0) message = "Resultados obtenidos: 0";
    return { success:true, data, message }
}

module.exports = { objSuccess }