let AdminMediator = function () { };

const CommonController = require("../controllers/CommonController");
const AdminController = require("../controllers/AdminController");
const ApiMessages = require("../config/ApiMessages");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;
const ResponseController = require("../controllers/ResponseController");


AdminMediator.Update_App_Versions_Settings = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.Application_Android_Version)
            && CommonController.isNumber(values.Application_IOS_Version)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Update_App_Versions_Settings(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await CommonController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Fetch_App_Versions_Settings = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Fetch_App_Versions_Settings(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AdminMediator.Logout = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null
        ) {
            let AdminData = await CommonController.Check_Only_Admin(values);
            let Result = await AdminController.Logout(AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Activate_Admin = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            let Result = await AdminController.Activate_Admin(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactivate_Admin = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            let Result = await AdminController.Inactivate_Admin(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Name != null && values.Name != ''
            && values.Designation != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, AdminData);
            let Result = await AdminController.Update_Information(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Admin_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
            && values.Name != null && values.Name != ''
            && values.Designation != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
            && values.Roles != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, Selected_AdminData);
            let Result = await AdminController.Update_Admin_Information(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AdminMediator.Update_Admin_Password = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
            && values.Password != null && values.Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Update_Admin_Password(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AdminMediator.Update_Password = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Old_Password != null && values.Old_Password != ''
            && values.New_Password != null && values.New_Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Password_Validation(values.New_Password);
            let Result = await AdminController.Update_Password(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Admin_Users = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.skip)
            && CommonController.isNumber(values.limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Admin_Users(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Create_Admin_User = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Name != null && values.Name != ''
            && values.Designation != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
            && values.Roles != null
        ) {
           // let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.PhoneNumber);
            ValidityStatus = await AdminController.Check_Whether_Admin_Email_Already_Exist(values);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Create_Admin_User(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Fetch_Admin_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Fetch_Admin_Complete_Information(AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


AdminMediator.Common_Password_Validation = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Password != null && values.Password != undefined && typeof (values.Password) === "string"
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await CommonController.Common_Password_Validation(values.Password);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } }
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Login = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
        ) {
            let ValidityStatus = CommonController.Common_Email_Validation(values.EmailID);
            let AdminData = await AdminController.Check_Whether_Admin_Email_Registered(values);
            let Result = await AdminController.Login(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//Create_User_DataBase API-1
AdminMediator.Create_User_DataBase = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            
            values.UserName != null && values.UserName != ''
            && values.EmailID != null && values.EmailID != ''
            // && values.CreatedAt != null
            // && values.UpdateAt != null
        ) {
           // let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            // ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.PhoneNumber);
           // ValidityStatus = await AdminController.Check_Whether_Admin_Email_Already_Exist(values);
           // ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Create_User_DataBase(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//Create_User_DataBase API-1

//Create_Student_Data API-2
AdminMediator.Create_Student_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            
            values.StudentID != null && values.StudentID != ''
            &&values.StudentName != null && values.StudentName != ''
            &&values.StudentCollege != null && values.StudentCollege != ''
            &&values.StudentPhone != null && values.StudentPhone != ''
            && values.StudentEmailID != null && values.StudentEmailID != ''
            && values.Password != null && values.Password != ''
            && values.StudentStatus != null 
    
        ) {
           // let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.StudentEmailID);
            ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.StudentPhone);
            ValidityStatus = await AdminController.Check_Whether_Admin_Email_Already_Exist(values);
            // ValidityStatus = await AdminController.Email_Already_Exist(values);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Create_Student_Data(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Create_Student_Data API-2

//Update Student_Data API
AdminMediator.Update_Student_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.StudentID != null && values.StudentID != ''
            &&values.StudentName != null && values.StudentName != ''
            &&values.StudentCollege != null && values.StudentCollege != ''
            &&values.StudentPhone != null && values.StudentPhone != ''
            && values.StudentEmailID != null && values.StudentEmailID != ''
            && values.Password != null && values.Password != ''
            && values.StudentStatus != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            //let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let Selected_AdminData = await CommonController.Check_Only_StudentID({ StudentID: values.StudentID });
           // let Selected_AdminData = await CommonController.Check_Only_Admin({ StudentID : values.Selected_StudentID  });
            //let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
           // ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
          //  ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, Selected_AdminData);
            let Result = await AdminController.Update_Student_Data(values, {});//Left Blank
         // let Result = await AdminController.Update_Admin_Information(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Update Student_Data API

//Craete Admins Users
AdminMediator.Create_Admins_User = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Name != null && values.Name != ''
            && values.Designation != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
            && values.Roles != null
        ) {
           //let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.PhoneNumber);
            ValidityStatus = await AdminController.Check_Whether_Admin_Email_Already_Exist(values);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Create_Admins_User(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Craete Admins Users

//Activate Student Data 05-10-2021
AdminMediator.Activate_StudentData = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_StudentID != null
        ) {
            //{values = Is line ka matlab hum whole object ko send kr rhe hain}
            let AdminData = await CommonController.Check_for_Admin(values);
            //{StudentID: values.Selected_StudentID = Is line ka matlab hum only object ka specific variable send kr rhe hain}
            let Selected_StudentData = await CommonController.Check_Only_StudentID({ StudentID: values.Selected_StudentID });
           // let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(StudentData, Selected_StudentData);
            let Result = await AdminController.Activate_StudentData(values, Selected_StudentData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Activate Student Data 05-10-21

//InActivate Student Data
AdminMediator.Inactivate_StudentData = async (req, res) => {
    try {
        //Notes:-
        //JSON.stringify turns a JavaScript object into JSON text and stores that JSON text in a string
        //stringify = Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
        //JSON.parse turns a string of JSON text into a JavaScript object
        //parse =    Converts a JavaScript Object Notation (JSON) string into an object.
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.StudentID != null
        ) {
            let StudentData = await CommonController.Check_for_Admin(values);
            let Selected_StudentData = await CommonController.Check_Only_StudentID( values);
            //let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(StudentData, Selected_StudentData);
            let Result = await AdminController.Inactivate_StudentData(values, Selected_StudentData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

//End InActivate Student Data


//Activate_Inactivate_StudentData 05-10-2021
AdminMediator.Activate_Inactivate_StudentData = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_StudentID != null
        ) {
            //{values = Is line ka matlab hum whole object ko send kr rhe hain}
            let StudentData = await CommonController.Check_for_Admin(values);
            //{StudentID: values.Selected_StudentID = Is line ka matlab hum only object ka specific variable send kr rhe hain}
            let Selected_StudentData = await CommonController.Check_Only_StudentID({ StudentID: values.Selected_StudentID });
            let Result = await AdminController.Activate_Inactivate_StudentData(StudentData, Selected_StudentData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Activate_Inactivate_StudentData

//Filter_All_StudentsData
AdminMediator.Filter_All_StudentsData = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            //skip is used to how many data is skiped from the bulk/more data
            //limit is used to limit the number of data i-e how many data transfer at one time
            && CommonController.isNumber(values.skip)
            && CommonController.isNumber(values.limit)
        ) {
           
            let StudentData = await CommonController.Check_for_Admin(values);
            console.log("Hello Check for Mediators",JSON.stringify(values));
            let Result = await AdminController.Filter_All_StudentsData(values );
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Filter_All_StudentsData

//*****************START*********06-10-2021******************************** */
//Create_Restaurant_Data API
AdminMediator.Create_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            
            values.AdminID != null 
            &&values.RestaurantID != null && values.RestaurantID != ''
            &&values.RestaurantName != null && values.RestaurantName != ''
            && values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
            &&values.RestaurantAddress != null && values.RestaurantAddress != ''
            &&values.RestaurantLatitude != null && values.RestaurantLatitude != ''
            && values.RestaurantLongitude != null && values.RestaurantLongitude != ''
            && values.ReataurantStatus != null 
    
        ) {
            //let AdminData = await CommonController.Check_for_Admin(values);
           // let ValidityStatus = await CommonController.Common_Email_Validation(values.StudentEmailID);
            //ValidityStatus = await CommonController.Common_Phone_Number_Validation(values.StudentPhone);
           // ValidityStatus = await AdminController.Check_Whether_Admin_Email_Already_Exist(values);
            // ValidityStatus = await AdminController.Email_Already_Exist(values);
           // ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Create_Restaurant_Data(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Create_Restaurant_Data API

//Update_Restaurant_Data API
AdminMediator.Update_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            &&values.RestaurantID != null && values.RestaurantID != ''
            &&values.RestaurantName != null && values.RestaurantName != ''
            &&values.RestaurantAddress != null && values.RestaurantAddress != ''
            &&values.RestaurantLatitude != null && values.RestaurantLatitude != ''
            && values.RestaurantLongitude != null && values.RestaurantLongitude != ''
            && values.RestaurantStatus != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            //let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
           // let Selected_AdminData = await Co mmonController.Check_Only_StudentID({ StudentID: values.StudentID });
           // let Selected_AdminData = await CommonController.Check_Only_Admin({ StudentID : values.Selected_StudentID  });
            //let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
           // ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
          //  ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, Selected_AdminData);
            let Result = await AdminController.Update_Restaurant_Data(values, {});//Left Blank
         // let Result = await AdminController.Update_Admin_Information(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Update_Restaurant_Data API

//Active_Inactive_Restaurant_Data 06-10-2021
AdminMediator.Active_Inactive_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_RestauranID != null
        ) {
            //{values = Is line ka matlab hum whole object ko send kr rhe hain}
            let RestaurantData = await CommonController.Check_for_Admin(values);
            //{RestaurantID: values.Selected_RestaurantID = Is line ka matlab hum only object ka specific variable send kr rhe hain}
            let Selected_RestaurantData = await CommonController.Check_Only_RestaurantID({ RestaurantID: values.Selected_RestaurantID });
            let Result = await AdminController.Active_Inactive_Restaurant_Data(RestaurantData, Selected_RestaurantData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Active_Inactive_Restaurant_Data

//Filter_Restaurant_Data
AdminMediator.Filter_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            //skip is used to how many data is skiped from the bulk/more data
            //limit is used to limit the number of data i-e how many data transfer at one time
            && CommonController.isNumber(values.skip)
            && CommonController.isNumber(values.limit)
        ) {
           
            let RestaurantData  = await CommonController.Check_for_Admin(values);
            //let RestaurantData  = await CommonController.Check_Only_Admin(values);

            //console.log("Hello Check for Mediators",JSON.stringify(values));
            let Result = await AdminController.Filter_Restaurant_Data(values );
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Filter_Restaurant_Data

//****************END**********02-111-2021******************************** */



//Creates_Restaurant_Data
// list the longitude first and then latitude or Which means this takes longitude at index 0 and latitude at index 1.
AdminMediator.Creates_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
    
            values.RestaurantName != null && values.RestaurantName != ''
            && values.long!= null && values.lat != null 
            && values. PhoneNumber != null 
            && values.Address != null
            && values. EmailID != null
            //Whenever we comment the below line It shows DataBase Error: i-e MongoError: Can't extract geo keys:
           // && !CommonController.isfloat(values.long) && !CommonController.isfloat(values.lat) 
        ) {
            let Result = await AdminController.Creates_Restaurant_Data(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Creates_Restaurant_Data
//****************END**********07-11-2021******************************** */


//Find_NearBy_Restaurant_Data
AdminMediator.Find_NearBy_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));


       
           // let RestaurantData = await CommonController.Reads_Data(values);
            let Result = await AdminController.Find_NearBy_Restaurant_Data(values);
            await ResponseController.Common_Response_Handler(res, Result);


    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Find_NearBy_Restaurant_Data


//Updates_Restaurant_Data
AdminMediator.Updates_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            
            values.RestaurantName != null
            && values.lat != null 
            && values.long != null
            && values.PhoneNumber != null
            && values.EmailID != null && values.EmailID != ''
            // && !CommonController.isfloat(values.lat) && !CommonController.isfloat(values.long)
            // && Number.isInteger(values.lati) && Number.isInteger(values.long)
    
        ) {
            let RestaurantData = await CommonController.Check_for_Data(values);
            let Result = await AdminController.Updates_Restaurant_Data(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Updates_Restaurant_Data


//Search_Restaurant_Data
AdminMediator.Search_Restaurant_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            //skip is used to how many data is skiped from the bulk/more data
            //limit is used to limit the number of data i-e how many data transfer at one time
            CommonController.isNumber(values.skip)
            && CommonController.isNumber(values.limit)
        ) {
           
            let RestaurantData = await CommonController.Check_for_Data(values);
            let Result = await AdminController.Search_Restaurant_Data(values );
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Search_Restaurant_Data


//**********************17/11/2021 CRUD OPERATION****************************** */
//Creates_Data
// AdminMediator.Creates_Data = async (req, res) => {
//     try {
//         let values = JSON.parse(JSON.stringify(req.body));
//         if (
//             values.nTime != null && values.nTime != ''
//             && values.index != null && values.index != ''
//             && values.name!= null && values.isActive != null 
//             && values.registered != null 
//             && values.age != null
//             && values.gender != null
//             && values.eyeColor != null 
//             && values.favoriteFruit != null,
//             company:{
//                 values.title != null 
//                 && values.email != null 
//                 && values.phone != null 
//                 location:{
//                 values.country != null 
//                 && values.address != null
//                 }
//             },
//             values.tags[] != null
            
//        ){
//             let Result = await AdminController.Creates_Data(values);
//             await ResponseController.Common_Response_Handler(res, Result);
//         } 
//         else {
//             throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
//             }
//     } catch (error) {
//         await ResponseController.Common_Response_Handler(res, error);
//     }
// }
//End Creates_Data


//Reads_Data. Read Data from Database.
AdminMediator.Reads_Data = (values) => {
        try {
            let values = JSON.parse(JSON.stringify(req.body));
                
            let Result = await AdminController.Reads_Data(values);
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.DATA_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
    }
}

//Reads_Data. Read Data from Database.

//Updates_Data
// AdminMediator.Updates_Data = async (req, res) => {
//     try {
//         let values = JSON.parse(JSON.stringify(req.body));
//         if (
//             values.nTime != null && values.nTime != ''
//             && values.index != null && values.index != ''
//             && values.name!= null && values.isActive != null 
//             && values.registered != null 
//             && values.age != null
//             && values.gender != null
//             && values.eyeColor != null 
//             && values.favoriteFruit != null,
//             company:{
//                 values.title != null 
//                 && values.email != null 
//                 && values.phone != null 
//                 location:{
//                 values.country != null 
//                 && values.address != null
//                 }
//             },
//             values.tags[] != null,
    
//         ){
//             let Result = await AdminController.Updates_Data(values);
//             await ResponseController.Common_Response_Handler(res, Result);
//         } else {
//             throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
//                }
//     } catch (error) {
//         await ResponseController.Common_Response_Handler(res, error);
//                  }
// }
//End Updates_Data


//Deletes_Data
AdminMediator.Deletes_Data = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.index != null && values.name != null
        
        ) {
           
            let Result = await AdminController.Deletes_Data(values );
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}
//End Deletes_Data
//**********************17/11/2021 END CRUD OPERATION****************************** */
//Testin_Api_Data
//Testin_Api_Data


module.exports = AdminMediator;








// {
//     let query = {
//         Status: true
//     };
//     let toSkip = parseInt(values.skip);
//     let toLimit = parseInt(values.limit);
//     let sortOptions = {
//         Name: 1
//     };
//     if (Boolify(values.Whether_Status_Filter)) {
//         query.Status = values.Status

//     }



// if (Boolify(values.Whether_Status_Filter)) {
//     query.Status = Boolify(values.Status);
// };
// if (Boolify(values.Whether_Search_Filter)) {
//     let Search_Input = String(values.Search_Input);
//     let Search_Options = {
//         $regex: Search_Input,
//         $options: "i"
//     };
//     query.$or = [
//         {
//             State_Title: Search_Options
//         },
//     ]
// };


// if (Boolify(values.Whether_Package_Type_Filter)) {
//     query.Package_Type = parseInt(values.Package_Type);
// };
// if (Boolify(values.Whether_Section_Selection_Type_Filter)) {
//     query.Section_Selection_Type = parseInt(values.Section_Selection_Type);
// };
// if (Boolify(values.Whether_Active_Filter)) {
//     query.Whether_Active = Boolify(values.Whether_Active);
// };




            // ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            // ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, Selected_AdminData);
            // let Result = await AdminController.Update_Admin_Information(values, Selected_AdminData);
            // await ResponseController.Common_Response_Handler(res, Result);