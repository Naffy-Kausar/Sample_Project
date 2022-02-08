const express = require('express');
const AdminMediator = require('../mediators/AdminMediator');

const router = express.Router();

router.route('/Login').post(AdminMediator.Login);

router.route('/Common_Password_Validation').post(AdminMediator.Common_Password_Validation);

router.route('/Fetch_Admin_Complete_Information').post(AdminMediator.Fetch_Admin_Complete_Information);

router.route('/Create_Admin_User').post(AdminMediator.Create_Admin_User);

router.route('/Filter_All_Admin_Users').post(AdminMediator.Filter_All_Admin_Users);

router.route('/Update_Password').post(AdminMediator.Update_Password);

router.route('/Update_Admin_Password').post(AdminMediator.Update_Admin_Password);

router.route('/Update_Admin_Information').post(AdminMediator.Update_Admin_Information);

router.route('/Update_Information').post(AdminMediator.Update_Information);

router.route('/Inactivate_Admin').post(AdminMediator.Inactivate_Admin);

router.route('/Activate_Admin').post(AdminMediator.Activate_Admin);

router.route('/Logout').post(AdminMediator.Logout);

//Own User_DataBase API 04-10-2021
router.route('/Create_User_DataBase').post(AdminMediator.Create_User_DataBase);
router.route('/Create_Student_Data').post(AdminMediator.Create_Student_Data);
router.route('/Update_Student_Data').post(AdminMediator.Update_Student_Data);
router.route('/Create_Admins_User').post(AdminMediator.Create_Admins_User);
router.route('/Inactivate_StudentData').post(AdminMediator.Inactivate_StudentData);
router.route('/Activate_StudentData').post(AdminMediator.Activate_StudentData);
router.route('/Activate_Inactivate_StudentData').post(AdminMediator.Activate_Inactivate_StudentData);
router.route('/Filter_All_StudentsData').post(AdminMediator.Filter_All_StudentsData);
//06-10-2021
router.route('/Create_Restaurant_Data').post(AdminMediator.Create_Restaurant_Data);
router.route('/Update_Restaurant_Data').post(AdminMediator.Update_Restaurant_Data);
router.route('/Active_Inactive_Restaurant_Data').post(AdminMediator.Active_Inactive_Restaurant_Data);
router.route('/Filter_Restaurant_Data').post(AdminMediator.Filter_Restaurant_Data);


//2/11/2021 To Search/Find Geo Indexing
// router.route('/Create_GeoIndex_Restaurant_Data').post(AdminMediator.Create_GeoIndex_Restaurant_Data);
// router.route('/Find_Restaurant_Data').post(AdminMediator.Find_Restaurant_Data);
//2/11/2021 To Search/Find Geo Indexing

//7/11/2021 To Save_Restaurant_Data
router.route('/Creates_Restaurant_Data').post(AdminMediator.Creates_Restaurant_Data);
router.route('/Find_NearBy_Restaurant_Data').post(AdminMediator.Find_NearBy_Restaurant_Data);
router.route('/Updates_Restaurant_Data').post(AdminMediator.Updates_Restaurant_Data);
router.route('/Search_Restaurant_Data').post(AdminMediator.Search_Restaurant_Data);
//7/11/2021 To Save_Restaurant_Data
//06-10-2021
//17/11/2021 CRUD OPERATION
router.route('/Creates_Data').post(AdminMediator.Creates_Data);
router.route('/Reads_Data').post(AdminMediator.Reads_Data);
router.route('/Updates_Data').post(AdminMediator.Updates_Data);
router.route('/Deletes_Data').post(AdminMediator.Deletes_Data);
router.route('/Testin_Api_Data').post(AdminMediator.Testing_Api_Data);

//17/11/2021 CRUD OPERATION
//Own User_DataBase API  04-10-2021

router.route('/Fetch_App_Versions_Settings').post(AdminMediator.Fetch_App_Versions_Settings);
router.route('/Update_App_Versions_Settings').post(AdminMediator.Update_App_Versions_Settings);

module.exports = router;       