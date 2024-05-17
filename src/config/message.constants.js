// const { CONSTANT } = require('./constant') ;

// const MESSAGES = {
// 	ERROR: {
// 		UNAUTHORIZED_ACCESS: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
// 			"message": "You are not authorized to perform this action.",
// 			"type": "UNAUTHORIZED_ACCESS"
// 		},
// 		INTERNAL_SERVER_ERROR: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
// 			"message": "Please try after some time.",
// 			"type": "INTERNAL_SERVER_ERROR"
// 		},
// 		INVALID_TOKEN: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
// 			"message": "Token is invalid.",
// 			"type": "INVALID_TOKEN"
// 		},
// 		TOKEN_EXPIRED: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
// 			"message": "Token has been expired.",
// 			"type": "TOKEN_EXPIRED"
// 		},
// 		TOKEN_GENERATE_ERROR: (error) => {
// 			return {
// 				"statusCode": CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
// 				"message": `${error}.`,
// 				"type": "TOKEN_GENERATE_ERROR"
// 			};
// 		},
// 		EMAIL_NOT_REGISTERED: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
// 			"message": "Please register your email address.",
// 			"type": "EMAIL_NOT_REGISTERED"
// 		},
// 		INCORRECT_PASSWORD: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
// 			"message": "Authentication failed, wrong password.",
// 			"type": "INCORRECT_PASSWORD"
// 		},
// 		USER_NOT_FOUND: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.UNREGISTERED,
// 			"message": "User not found.",
// 			"type": "USER_NOT_FOUND"
// 		},
// 		ACCESS_DENIED: {
// 			"statusCode": CONSTANT.HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
// 			"message": "Access denied.",
// 			"type": "ACCESS_DENIED"
// 		},
// 		FIELD_REQUIRED: (value) => {
// 			return {
// 				"statusCode": CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
// 				"message": value + " is required.",
// 				"type": "FIELD_REQUIRED"
// 			};
// 		},
// 		FIELD_VALIDATION_FAILED: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
// 			'message': "We could not process your request, please try after some time",
// 			'type': 'FIELD_VALIDATION_FAILED'
// 		},
// 		INVALID_SESSION_TOKEN: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
// 			'message': "Please provide valid session token",
// 			'type': 'INVALID_SESSION_TOKEN'
// 		},
// 		SESSION_TOKEN_NOT_PROVIDED: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
// 			'message': "Session token  was not provided",
// 			'type': 'SESSION_TOKEN_NOT_PROVIDED'
// 		},
// 		ACCOUNT_BLOCKED: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
// 			'message': "Account is blocked, Please contact to admin",
// 			'type': 'ACCOUNT_BLOCKED'
// 		},
// 		ACCOUNT_DELETED: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
// 			'message': "Account is deleted, Please contact to admin",
// 			'type': 'ACCOUNT_BLOCKED'
// 		},
// 		INVALID_ROUTE: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.URL_NOT_FOUND,
// 			'message': "Invalid request provided.",
// 			'type': "INVALID_ROUTE"
// 		},
// 		INVALID_EMAIL: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
// 			'message': "Email not registered with us",
// 			'type': 'INVALID_EMAIL'
// 		},
// 		SUBADMIN_AUTH_FORBID: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
// 			'message': "Forbidden access",
// 			'type': 'SUBADMIN_AUTH_FORBID'
// 		},
// 		INVALID_INPUT_FORMAT: (value) => {
// 			return {
// 				"statusCode": CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
// 				"message": value + " is invalid",
// 				"type": "INVALID_INPUT_FORMAT"
// 			};
//         },
// 	},
// 	SUCCESS: {
// 		RESPONSE: (data) => {
// 			return {
// 				"statusCode": CONSTANT.HTTP_STATUS_CODE.OK,
// 				"message": "Resonse get successfully.",
// 				"type": "RESPONSE",
// 				"data": data
// 			};
// 		},
// 		LOGIN_SUCCESS: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.OK,
// 			'message': "Logged in successfully",
// 			'type': 'LOGIN_SUCCESS'
// 		},
// 		SUCCESS: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.OK,
// 			'message': "Success",
// 			'type': 'SUCCESS'
// 		},
// 		DEFAULT: (data) => {
// 			return {
// 				"statusCode": CONSTANT.HTTP_STATUS_CODE.OK,
// 				"message": "Success",
// 				"type": "DEFAULT",
// 				"data": data
// 			};
// 		},
// 		DEFAULT_MESSAGE: (data, sucessType) => {
// 			return {
// 				"statusCode": CONSTANT.HTTP_STATUS_CODE.OK,
// 				"message": `${sucessType} Successfully`,
// 				"type": "DEFAULT",
// 				"data": data
// 			};
// 		},
// 		REFRESH_TOKEN: (data) => {
// 			return {
// 				"statusCode": CONSTANT.HTTP_STATUS_CODE.OK,
// 				"message": "Token refresh successfully",
// 				"type": "REFRESH_TOKEN",
// 				"data": data
// 			};
// 		},
//         POST_SUCCESS: {
// 			'statusCode': CONSTANT.HTTP_STATUS_CODE.CREATED,
// 			'message': "Post created",
// 			'type': 'SUCCESS'
// 		},
// 	}
// };



// module.exports = {
//     MESSAGES: MESSAGES
// };

