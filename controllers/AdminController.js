let AdminController = function () { };


//packages
const uuid = require("uuid");
const moment = require("moment");
const crypto = require("crypto");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;


//helpers
const config = require("../config/config");
const ApiMessages = require("../config/ApiMessages");
const CommonMessages = require("../config/CommonMessages");
const CommonController = require("./CommonController");
const ResponseController = require("./ResponseController");

//Own API Models/Schema
const SaveApi = require("../models/SaveApi");
const StudentData = require("../models/StudentData");
const RestaurantData = require("../models/RestaurantData");
const RestaurantsGeo = require("../models/RestaurantsGeo");
//Own API Models/Schema
//models
const Admins = require("../models/Admins");


AdminController.Update_App_Versions_Settings = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {

            };
            let fndupdchanges = {
                $set: {
                    Application_Android_Version: parseFloat(values.Application_Android_Version),
                    Application_IOS_Version: parseFloat(values.Application_IOS_Version),
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            let Data = await App_Versions_Settings.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -_v').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY, Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_App_Versions_Settings = values => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_App_Versions_Settings();
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Logout = (AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    SessionID: "",
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.LOGOUT_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Activate_Admin = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Status: true,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactivate_Admin = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Status: false,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Information = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Name: values.Name,
                    Designation: values.Designation,
                    PhoneNumber: values.PhoneNumber,
                    EmailID: values.EmailID,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            };
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
AdminController.Update_Admin_Information = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Name: values.Name,
                    Designation: values.Designation,
                    PhoneNumber: values.PhoneNumber,
                    EmailID: values.EmailID,
                    Roles: values.Roles,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Check_Whether_Admin_Email_Already_Exist = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                AdminID: {
                    $ne: AdminData.AdminID
                },
                EmailID: values.EmailID,
                Status: true
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_Admin_Complete_Information = (AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Admin_Complete_Information(AdminData);
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Admin_Password = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let pass = Password + PasswordSalt;
            let PasswordHash = crypto.createHash('sha512').update(pass).digest("hex");
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    PasswordHash: PasswordHash,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Password = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Old_Password = String(values.Old_Password);
            let New_Password = String(values.New_Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let oldpass = Old_Password + PasswordSalt;
            let newpass = New_Password + PasswordSalt;
            let OldPasswordHash = crypto.createHash('sha512').update(oldpass).digest("hex");
            let NewPasswordHash = crypto.createHash('sha512').update(newpass).digest("hex");
            if (AdminData.PasswordHash === OldPasswordHash) {
                if (OldPasswordHash === NewPasswordHash) {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.OLD_PASSWORD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT } }
                } else {
                    let fndupdquery = {
                        AdminID: AdminData.AdminID
                    };
                    let fndupdchanges = {
                        $set: {
                            PasswordHash: NewPasswordHash,
                            updated_at: new Date()
                        }
                    };
                    let fndupdoptions = {
                        upsert: true,
                        setDefaultsOnInsert: true,
                        new: true
                    }
                    AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
                    resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
                }
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_OLD_PASSWORD } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


AdminController.Filter_All_Admin_Users = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Status: true
            };
            let toSkip = parseInt(values.skip);
            let toLimit = parseInt(values.limit);
            let sortOptions = {
                Name: 1
            };
            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await Admins.countDocuments(query).lean().exec();
            let Result = await Admins.find(query).select('-_id -__v -updated_at  -Point -Geometry -Delivery_Pricings -PasswordHash -PasswordSalt -SessionID').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Create_Admin_User = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = await CommonController.Random_OTP_Number();
            let pass = Password + PasswordSalt;
            let Data = {
                AdminID: uuid.v4(),
                Name: values.Name,
                Designation: values.Designation,
                PhoneNumber: values.PhoneNumber,
                EmailID: values.EmailID,
                PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
                PasswordSalt: PasswordSalt,
                Roles: values.Roles,
                created_at: new Date(),
                updated_at: new Date()
            };
            let SaveResult = await Admins(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Check_Whether_Admin_Email_Already_Exist = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID,
                Status: true
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//Craete Admin User API
AdminController.Create_Admins_User = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = await CommonController.Random_OTP_Number();
            let pass = Password + PasswordSalt;
            let Data = {
                AdminID: uuid.v4(),
                Name: values.Name,
                Designation: values.Designation,
                PhoneNumber: values.PhoneNumber,
                EmailID: values.EmailID,
                PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
                PasswordSalt: PasswordSalt,
                Roles: values.Roles,
                created_at: new Date(),
                updated_at: new Date()
            };
            let SaveResult = await Admins(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Craete Admin User API


//Create Function
// AdminController.Email_Already_Exist = (values) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let query = {
//                 EmailID: values.EmailID,
//                 Status: true
//             };
//             let Result = await StudentData.findOne(query).lean();
//             if (Result === null) {
//                 resolve("Validated Successfully");
//             } else {
//                 throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
//             };
//         } catch (error) {
//             reject(await ResponseController.Common_Error_Handler(error));
//         }
//     });
// }
//End Create Function

AdminController.Check_Whether_Admin_Email_Registered = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_NOT_REGISTERED } }
            } else {
                if (Result.Status) {
                    resolve(Result);
                } else {
                    throw { success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } }
                }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Login = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let pass = Password + PasswordSalt;
            let PasswordHash = crypto.createHash('sha512').update(pass).digest("hex");
            if (AdminData.PasswordHash === PasswordHash) {
                let fndupdquery = {
                    AdminID: AdminData.AdminID
                };
                let fndupdchanges = {
                    $set: {
                        SessionID: uuid.v4(),
                        updated_at: new Date()
                    }
                };
                let fndupdoptions = {
                    upsert: true,
                    setDefaultsOnInsert: true,
                    new: true
                };
                AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
                resolve({ success: true, extras: { Status: CommonMessages.LOGIN_SUCCESSFULLY, AdminData: AdminData } })
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PASSWORD } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//Own User_DataBase API-1
AdminController.Create_User_DataBase = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            //let Password = String(values.Password);
          //  let PasswordSalt = await CommonController.Random_OTP_Number();
           // let pass = Password + PasswordSalt;
            let Data = {
                UserID: uuid.v4(),
                UserName: values.UserName,
                EmailID: values.EmailID,
               // PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
                //PasswordSalt: PasswordSalt,
                CreatedAt: new Date(),
                UpdateAt: new Date()
            };
            // let SaveResult = await Admins(Data).save();
            let SaveResult = await SaveApi(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

//Own User_DataBase API-1

//Create_Student_Data API-2
AdminController.Create_Student_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = await CommonController.Random_OTP_Number();
            let pass = Password + PasswordSalt;
            let Data = {
                StudentID: uuid.v4(),
                StudentName: values.StudentName,
                StudentCollege: values.StudentCollege,
                StudentPhone: values.StudentPhone,
                StudentEmailID : values.StudentEmailID,
                StudentStatus: values.StudentStatus,
                PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
                PasswordSalt: PasswordSalt,
                CreatedAt: new Date(),
                UpdateAt: new Date()
            };
            // let SaveResult = await Admins(Data).save();
            let SaveResult = await StudentData(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}  // End Create_Student_Data API-2

//Update_Student_Data  API 04-10-2021
AdminController.Update_Student_Data = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                //Here it is used to find/search the ID:Then after finding/matching the ID 
                //it then take further steps i-e it updated the below values
                StudentID: values.StudentID
            };
            let fndupdchanges = {
                $set: {
                   
                    StudentName: values.StudentName,
                    StudentCollege: values.StudentCollege,
                    StudentPhone: values.StudentPhone,
                    StudentEmailID: values.StudentEmailID,
                    Password: values.Password,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await StudentData.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Update_Student_Data  API

//Activate Student Data 05-10-2021
AdminController.Activate_StudentData = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                StudentID: AdminData.StudentID
            };
            let fndupdchanges = {
                $set: {
                    Status: true,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await StudentData.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Activate Student Data 05-10-2021

//InActivate Student Data 05-10-2021
AdminController.Inactivate_StudentData = (values, StudentDatax) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                StudentID: StudentDatax.StudentID
            };
            let fndupdchanges = {
                $set: {
                    Status: false,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await StudentData.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End InActivate Student Data 05-10-2021


//Function of Activate_Inactivate_StudentData-2: 05-10-2021
AdminController.Activate_Inactivate_StudentData = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let fndupdquery = {
                StudentID: AdminData.StudentID
            };
            let fndupdchanges;
            if(AdminData.Status){
                fndupdchanges = {
                    $set: {
                        Status: false,
                        updated_at: new Date()
                    }
                };
            }else{
                fndupdchanges = {
                    $set: {
                        Status: true,
                        updated_at: new Date()
                    }
                };
                resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
            }
         
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await StudentData.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Function of Activate_Inactivate_StudentData-2: 05-10-2021


// Filter_All_StudentsData: 05-10-2021
AdminController.Filter_All_StudentsData = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Status: true
            };
            let toSkip = parseInt(values.skip);
            let toLimit = parseInt(values.limit);
            let sortOptions = {
                Name: 1
            };
            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await StudentData.countDocuments(query).lean().exec();
            let Result = await StudentData.find(query).select('-_id -__v -updated_at  -Point -Geometry -Delivery_Pricings -PasswordHash -PasswordSalt -SessionID').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
// End Filter_All_StudentsData: 05-10-2021

//*****************START*********06-10-2021******************************** */
//Create_Restaurant_Data API
AdminController.Create_Restaurant_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
           // let Password = String(values.Password);
          //  let PasswordSalt = await CommonController.Random_OTP_Number();
           // let pass = Password + PasswordSalt;
            let Data = {
                AdminID: uuid.v4(),
                RestaurantID: values.RestaurantID,
                RestaurantName: values.RestaurantName,
                RestaurantAddress: values.RestaurantAddress,
                RestaurantLatitude : values.RestaurantLatitude,
                EmailID: values.EmailID,
                Password: values.Password,
                RestaurantLongitude : values. RestaurantLongitude,
                RestaurantStatus: values.RestaurantStatus,
                CreatedAt: new Date(),
                UpdateAt: new Date()
            };
            // let SaveResult = await Admins(Data).save();
            let SaveResult = await RestaurantData(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}  // End Create_Restaurant_Data API-2

//Update_Restaurant_Data  API 06-10-2021
AdminController.Update_Restaurant_Data = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                //Here it is used to find/search the ID:Then after finding/matching the ID 
                //it then take further steps i-e it updated the below values
                RestaurantID: values.RestaurantID
            };
            let fndupdchanges = {
                $set: {
                   
                    RestaurantName: values.RestaurantName,
                    RestaurantAddress: values.RestaurantAddress,
                    RestaurantLatitude : values.RestaurantLatitude,
                    RestaurantLongitude : values. RestaurantLongitude,
                    RestaurantStatus: values.RestaurantStatus,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await RestaurantData.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Update_Restaurant_Data  API

//Function of Active_Inactive_Restaurant_Data: 06-10-2021
AdminController.Active_Inactive_Restaurant_Data = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let fndupdquery = {
                RestaurantID: AdminData.RestaurantID
            };
            let fndupdchanges;
            if(AdminData.Status){
                fndupdchanges = {
                    $set: {
                        Status: false,
                        updated_at: new Date()
                    }
                };
            }else{
                fndupdchanges = {
                    $set: {
                        Status: true,
                        updated_at: new Date()
                    }
                };
                resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
            }
         
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await RestaurantData.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Function of Active_Inactive_Restaurant_Data: 06-10-2021

// Filter_Restaurant_Data: 06-10-2021
AdminController.Filter_Restaurant_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                 Status: true
               
            };
            let toSkip = parseInt(values.skip);
            let toLimit = parseInt(values.limit);
            let sortOptions = {
                Name: 1
            };

            if (Boolify(values.Whether_Search_Filter)) {
                let Search_Input = String(values.Search_Input);
                let Search_Options = {
                    $regex: Search_Input,
                    $options: "i"
                };
                query.$or = { 
                    RestaurantName: Search_Options
                }  
            };
             // query.RestaurantName = values.search_key
            //To search any specific name/data by passing specific name/data
            //  if(query.RestaurantName){ query.RestaurantName = values.search_key};
            //  else if(query.RestaurantAddress){query.RestaurantAddress = values.search_key};
            //  else{query.RestaurantName = values.search_key};
            //To search any specific name/data by passing specific name/data
            


            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await RestaurantData.countDocuments(query).lean().exec();
            let Result = await RestaurantData.find(query).select('-_id -__v -updated_at  -Point -Geometry -Delivery_Pricings -PasswordHash -PasswordSalt -SessionID').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
// End Filter_Restaurant_Data: 06-10-2021
//****************END**********06-10-2021******************************** */



//Creates_Restaurant_Data 
AdminController.Creates_Restaurant_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = {
                RestaurantName:values.RestaurantName,
               // location: { type: JSON.stringify(["Point"]),
                location: { 
                    type: "Point",
                    coordinates: [values.long,values.lat]
            },
            PhoneNumber:values.PhoneNumber,
            Address: values.Address,
            EmailID:values.EmailID
         } ;
            let SaveResult = await RestaurantsGeo(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.SAVED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Creates_Restaurant_Data 8-11-2021


//Find_NearBy_Restaurant_Data
AdminController.Find_NearBy_Restaurant_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};

              query = {
                    $or:[
                        {RestaurantName: {
                            $regex:(String(values.searchkey)),
                            $options: "i"
                        }},
                        {PhoneNumber: {
                            $regex:(String(values.searchkey)),
                            $options: "i"
                        }},
                        {Address: {
                            $regex:(String(values.searchkey)),
                            $options: "i"
                        }}],

                "location" :{
                    $near: {
                        $maxDistance: 1000*values.distance,
                        $geometry: {
                            type: "Point",
                            coordinates: [values.long,values.lat]
                        }
                    }
                }
            };
            let Result = await RestaurantsGeo.find(query).lean();
            if(Result!=null){
            resolve({ success: true, extras: { Data: Result } });
            }
            if (Result === null){
             resolve({ success: true, extras: {code: 2, msg: ApiMessages.Restaurant_Data_NotFound} }); 
            }
            else{
                throw{ success: false, extras:{ code: 1, msg: ApiMessages.SERVER_ERROR}}
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
//End Find_NearBy_Restaurant_Data

//Updates_Restaurant_Data
AdminController.Updates_Restaurant_Data = (values, RestaurantUData) => {
    return new Promise(async (resolve, reject) => {
        try { 
            let fndupdquery = {
                RestaurantName: values.RestaurantName
            };

            let fndupdchanges = {
                $set: {
                   RestaurantName: values.RestaurantName,
                   location: { type: "Point",
                   coordinates: [values.long,values.lat]},
                   PhoneNumber: values.PhoneNumber,
                   EmailID: values.EmailID,
                   CreatedAt: new Date(),
                   UpdateAt: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            RestaurantUData = await RestaurantsGeo.findOneAndUpdate(fndupdquery, fndupdchanges).lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}   // End Updates_Restaurant_Data


// Search_Restaurant_Data
AdminController.Search_Restaurant_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                 Status: true
               
            };
            let toSkip = parseInt(values.skip);
            let toLimit = parseInt(values.limit);
            let sortOptions = {
                Name: 1
            };
            if (Boolify(values.Whether_Status_Filter)) {
                    query.Status = Boolify(values.Status);
                };
           
            if (Boolify(values.Whether_Search_Filter)) {
                let Search_Input = String(values.Search_Input);
                let Search_Options = {
                    $regex: Search_Input,
               //When you use the regular expression approach, you can use the "i" for "insensitive" option:
                    $options: "i"
                };
                query.$or 
                    { 
                        RestaurantName: Search_Options
                    }
                    // },
                    // { 
                    //     PhoneNumber: Search_Options
                    // }
                    // { 
                    //     long: Search_Options
                    // },
                    // { 
                    //     lat: Search_Options
                    // }
                    
                
            };
            let Result = await RestaurantsGeo.find(query).lean();
            resolve({ success: true, extras: { Data: Result } });
        
        if (Result === null){
            resolve({ success: true, extras: {code: 2, msg: ApiMessages.Restaurant_Data_NotFound} }); 
           }
           else{
               throw{ success: false, extras:{ code: 1, msg: ApiMessages.SERVER_ERROR}}
           }
         } catch (error) {
           reject(await ResponseController.Common_Error_Handler(error));
       }
   });
} 
// End Search_Restaurant_Data 
//****************END**********09-11-2021******************************** */


//17/11/2021 CRUD OPERATION


//Creates_Data
// AdminController.Creates_Data= (values) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let query = {
//                 insertMany({
//                    nTime: values.nTime,
//                    index: values.index,
//                    name: values.name,
//                    registered: values.registered,
//                    age: values.age,
//                    gender: values.gender,
//                    eyeColor: values.eyeColor,
//                    favoriteFruit: values.favoriteFruit,
//                    company:{
//                     title: values.title,
//                     email: values.email,
//                     phone: values.phone,
//                     location:{
//                     country: values.country,
//                     address: values.address
//                     }
//                    },
//                    tags: values.tags,
                       
//                  } )
//                 }   
    
//            let Result = await Crud_Operation.insertMany(query).lean();
//             resolve({ success: true, extras: { Status: CommonMessages.SAVED_SUCCESSFULLY } });
//         } catch (error) {
//             reject(await ResponseController.Common_Error_Handler(error));
//         }
//     });
// }
//End Creates_Data8-11-2021

//Reads_Data.Reads_Data from Database.
AdminController.Reads_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                name: values.name
            };
            let Result = await Crud_Operation.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.DATA_NOT_FOUND } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

//Reads_Data.Reads_Data from Database.


//Updates_Data
AdminController.Updates_Data = (values, RestaurantUData) => {
    return new Promise(async (resolve, reject) => {
        try { 
            let fndupdquery = {
                index: values.index
            };

            let fndupdchanges = {
                $set: {
                   nTime: values.nTime,
                   index: values.index,
                   name: values.name,
                   registered: values.registered,
                   age: values.age,
                   gender: values.gender,
                   eyeColor: values.eyeColor,
                   favoriteFruit: values.favoriteFruit,
                   company:{
                    title: values.title,
                    email: values.email,
                    phone: values.phone,
                    location:{
                    country: values.country,
                    address: values.address
                    }
                   },
                   tags: values.tags,
                   CreatedAt: new Date(),
                   UpdateAt: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            Crud_Data = await Crud_Operation.findOneAndUpdate(fndupdquery, fndupdchanges).lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}   // End Updates_Data


// Deletes_Data: 17-11-2021
AdminController.Deletes_Data = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                 Status: true
               
            };
            let toSkip = parseInt(values.skip);
            let toLimit = parseInt(values.limit);

            let Result = await Crud_Operation.drop(query).sort(sortOptions).lean();
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}
// End Deletes_Data: 17-11-2021
//17/11/2021 END CRUD OPERATION



module.exports = AdminController;
