// const { MESSAGES } = require("./message.constants");
// const Boom = require('boom');

// class CustomException {

// 	constructor() { }

// 	tokenGenerateException(error) {
// 		return new Exception(MESSAGES.ERROR.TOKEN_GENERATE_ERROR(error));
// 	}
// 	invalidTokenException() {
// 		return new Exception(MESSAGES.ERROR.INVALID_TOKEN);
//         return Promise.reject()
// 	}
// 	unauthorizedAccessException() {
// 		return new Exception(MESSAGES.ERROR.UNAUTHORIZED_ACCESS);
// 	}
// 	accessDeniedException() {
// 		return new Exception(MESSAGES.ERROR.ACCESS_DENIED);
// 	}
// 	userNotFoundException() {
// 		console.log("Debubgging::")
// 		return new Exception(MESSAGES.ERROR.USER_NOT_FOUND);
// 	}
// 	blockedException() {
// 		return new Exception(MESSAGES.ERROR.BLOCKED);
// 	}
// 	deletedException() {
// 		return new Exception(MESSAGES.ERROR.DELETED);
// 	}
// 	sessionExpiredException() {
// 		return new Exception(MESSAGES.ERROR.SESSION_EXPIRED);
// 	}
//     tokenNotFoundException() {
// 		return new Exception(MESSAGES.ERROR.SESSION_TOKEN_NOT_PROVIDED);
// 	}
//     emailNotRegisteredException() {
// 		return new Exception(MESSAGES.ERROR.EMAIL_NOT_REGISTERED);
// 	}
    
//     incorrectPasswordException() {
//         return new Exception(MESSAGES.ERROR.INCORRECT_PASSWORD);
//     }
// }

// // class Exception extends P{

// // 	constructor(errorMsg) {
// //         super(errorMsg.message);
// //         this.type = errorMsg.type; 
// //         this.statusCode = errorMsg.statusCode;
// // 	}
// // }


// module.exports = {
//     CustomException: CustomException, 
//     Exception: Exception,   
// };
