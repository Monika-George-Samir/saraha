

const ErrorResponse = ({
    status = 400,
    message = "Something went wrong",
    extra = undefined
}= {})=>{
    throw new Error(message, {cause: {status, extra}});
}


export const BadRequestException = ({message= "Bad Request", extra= undefined} = {})=>{
    return ErrorResponse({status: 400, message : message,  extra: extra})
}

export const NotFoundException = ({message = "Not Found error", extra = undefined} = {})=>{
    return ErrorResponse({status: 404, message, extra})
}

export const ConflictException = ({message = "Conflict error", extra = undefined} = {})=>{
    return ErrorResponse({status: 409, message, extra})
}

export const UnAuthorizedException = ({message = "UnAuthorized error", extra = undefined} = {})=>{
    return ErrorResponse({status: 401, message, extra})
}

export const ForbiddenException = ({message = "Forbidden error", extra = undefined} = {})=>{
    return ErrorResponse({status: 403, message, extra})
}