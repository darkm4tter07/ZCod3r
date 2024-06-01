const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) =>
            next(err)
        );
    };
};


//Using try catch and higher order function, In this case actually we are making a wrapper function

/*
const asyncHandler = (func) = async (req,res,next)=>{
    try{
        await func(req,res,next);
    }catch(err){
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/

export {asyncHandler};