const errors_en = {
    INTERNAL_ERROR: "Error occured. please, try again later or contact us at some@mail.ru",
    BAD_USER: "Provided data does not meet the requirements",
    USER_EXISTS: "User with the sane login or password already exists",
    BAD_COMMUNITY: "Provided data does not meet the requirements",
}

const errorList = (errorCode:keyof typeof errors_en) => {
    const result = errors_en[errorCode as keyof typeof errors_en]
    return result ? result : errorCode;
}

export default errorList;