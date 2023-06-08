var config={}

module.exports=(key)=>{
  try{
    return process.env[key]
  }catch(err){
    return null
  }
}