const callServices=async(method,req,res)=>{
    try {
        const result=await method(req)
        res.status(200).json({
            status:result.status,
            message:result.message,
            data:result.data
        })
    } catch (error) {
        res.status(400).json({
            status:'error',
            message:error.message,
            data:null
        })
    }
}

module.exports={
    callServices
}