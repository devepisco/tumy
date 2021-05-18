const objSuccess = (data,message)=>{
    if(data.length > 1 && !message) message = "Resultados obtenidos: " + data.length ;
    return { success:true, data, message }
}

module.exports = { objSuccess }