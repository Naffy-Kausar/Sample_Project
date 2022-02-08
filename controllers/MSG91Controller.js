
let MSG91Controller = function () { };
const MSG91 = require("msg91");
const axios = require("axios");
const ResponseController = require("./ResponseController");
const CommonMessages = require("../config/CommonMessages");
const ApiMessages = require("../config/ApiMessages");
const config = require("../config/config");
let msg91 = MSG91(config.msg91.authkey, config.msg91.sender_id, config.msg91.route_no);


MSG91Controller.Send_SMS = (PhoneNumber, Message) => {
    return new Promise(async (resolve, reject) => {
        try {
            let MessageSent = await msg91.send(PhoneNumber, Message);
            resolve("Message Sent Successfully");
        } catch (error) {
            console.log("MSG91 error----->", error);
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

MSG91Controller.Send_OTP = async (PhoneNumber, OTP) => {
    try {
        let options = {
            method: 'get',
            url: `${config.msg91.baseURL}/v5/otp`,
            params: {
                authkey: config.msg91.authkey,
                template_id: config.msg91.otp_template_id,
                extra_param: {
                    OTP: OTP,
                },
                mobile: PhoneNumber
            }
        };
        let Response = await axios(options);
        if (Response.status == 200 || Response.status == 201) {
            if (Response.data.type === "success") {
                console.log("MSG91 Sent Success----->");
                console.log(Response.data);
                return "Message Sent Successfully";
            } else {
                console.log("MSG91 Sent Error----->");
                console.log(Response.data);
                return "Message Sent Successfully";
            }
        } else {
            console.log("MSG91 Sent Error----->");
            console.log(Response.status);
            console.log(Response.data);
            return "Message Sent Successfully";

        }
    } catch (error) {
        console.log("MSG91 error----->", error);
        return "Message Sent Successfully";
    }
}

MSG91Controller.Get_Balance = () => {
    return new Promise(async (resolve, reject) => {
        try {
            msg91.getBalance(config.msg91.route_no, (err, Count) => {
                if (err) throw err;
                resolve(Count);
            });
        } catch (error) {
            console.log("MSG91 error----->", error);
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
module.exports = MSG91Controller;