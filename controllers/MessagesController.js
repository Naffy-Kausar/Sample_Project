
const MessagesController = function () { };
const MSG91Controller = require("./MSG91Controller");
const ResponseController = require("./ResponseController");


MessagesController.Send_OTP_TO_Mobile = (PhoneNumber, OTP) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Result = await MSG91Controller.Send_OTP(PhoneNumber, OTP);
            resolve(Result);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

MessagesController.Find_Default_SMS_Provider_and_Send_SMS = (PhoneNumber, Message) => {
    return new Promise(async (resolve, reject) => {
        try {
            let SendSMS = await MSG91Controller.Send_SMS(PhoneNumber, Message);
            resolve(SendSMS);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

module.exports = MessagesController;