let config = function () { };


config.Default_Icon_Information = {
    IconID: "",
    Icon20: "",
    Icon40: "",
    Icon60: "",
    Icon80: "",
    Icon100: "",
    IconOriginal: "",
};

config.Default_Image_Information = {
    ImageID: "",
    Image50: "",
    Image100: "",
    Image250: "",
    Image550: "",
    Image900: "",
    ImageOriginal: "",
};

config.Default_Video_Information = {
    VideoID: "",
    Video_Name: "",
    Video_Original_URL: "",
    videoDuration: 0,
    videoWidth: 0,
    videoHeight: 0,
    contentType: "",
    contentSize: 0,
    Whether_All_Resoulution_Converted: false,
    All_Video_Resolutions: [],
    Whether_Thumbnail_Image_Available: false,
    Thumbnail_Image_Information: config.Default_Image_Information,
    Whether_Video_Processed: false
};

config.Default_Document_Information = {
    DocumentID: "",
    Document_TITLE: "",
    Document_URL: "",
    contentType: "",
    contentSize: "",
};

//Body Parser Limit
config.BodyParserLimit = '10mb';
config.ParameterLimit = 100000000;

//Host Name
config.host = '';

//User OTP Tries and OTP Request
config.OTP_COUNT = 4;
config.OTP_TRIES_COUNT = 4;
config.OTP_COUNT_VOICE = 4;
config.OTP_TRIES_COUNT_VOICE = 4;
config.OTP_COUNT_TIME_IN_MINUTES = 30//SMS
config.OTP_TRIES_COUNT_TIME_IN_MINUTES = 30//SMS

//Date Time Format
config.Take_Date_Time_Format = 'DD-MM-YYYY HH:mm:ss';
config.Take_Date_Format = 'DD-MM-YYYY';
config.Take_Time = 'HH:mm:ss';
config.Common_Date_Time_Format = 'DD-MM-YYYY, HH:mm:ss A';
config.Common_Date_Format = 'DD-MM-YYYY';
config.Common_Time_Format = 'HH:mm:ss';
config.Password_UpperCase = /(?=.*[A-Z])/;
config.Password_LowerCase = /(?=.*[a-z])/;
config.Password_Digits = /(?=.*[0-9])/;
config.Password_Length = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
config.Password_Match_Regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
config.Sub_URL_Regex = /^[a-z-_]*$/;
config.CUSTOMER_CARE_NUMBER = "+9790";
config.MAIN_APP_TIME_OFFSET = 330;//India
config.UNIQUE_USER_API_KEY_LENGTH = 9;
config.MIN_PERCENTAGE = 0;
config.MAX_PERCENTAGE = 100;
config.earthRadius = 6378137;
config.Number_Regex = /^[0-9]+$/;
config.Axios_Timeout = 300000;//5 minutes
config.MINIMUM_RATING_POINT = 1;
config.MAXIMUM_RATING_POINT = 5;
//
 config.MongoURL ='';

//ports
config.port = 3000;

//Upload Limit Size
config.Icon_Size = 100 * 1024;//100 kb
config.Image_Size = 5 * 1024 * 1024;//5 MB
config.GIF_Size = 5 * 1024 * 1024;//5 MB
config.Document_Size = 5 * 1024 * 1024;//5 MB
config.Video_Size = 100 * 1024 * 1024;//100 MB
config.Audio_Size = 5 * 1024 * 1024;//5 MB
config.MAXIMUM_VIDEO_SECONDS = 30;//30 seconds
config.MINIMUM_VIDEO_RESOLUTION = 240;//360 video resolution

config.Supported_GIF_Image_Content_Type = [
    {
        name: "gif",
        type: "image/gif"
    },
];

config.Supported_Image_Icon_Content_Type = [
    {
        name: "jpe",
        type: "image/jpeg"
    },
    {
        name: "jpeg",
        type: "image/jpeg"
    },
    {
        name: "jpeg",
        type: "image/jpg"
    },
    {
        name: "png",
        type: "image/png"
    },
    {
        name: "bmp",
        type: "image/bmp"
    },
];

config.Supported_Audio_Content_Type = [
    {
        name: "m4a",
        type: "audio/mp4"
    },
    {
        name: "wav",
        type: "audio/vnd.wave"
    },
    {
        name: "wave",
        type: "audio/vnd.wave"
    },
    {
        name: "m3u",
        type: "audio/x-mpegurl"
    },
    {
        name: "aif",
        type: "audio/x-aiff"
    },
    {
        name: "aiff",
        type: "audio/x-aiff"
    },
    {
        name: "aifc",
        type: "audio/x-aiff"
    },
    {
        name: "mid",
        type: "audio/mid"
    },
    {
        name: "mp3",
        type: "audio/mpeg"
    },
    {
        name: "aac",
        type: "audio/aac"
    },
];

config.Supported_Video_Content_Type = [
    {
        name: "mp4",
        type: "video/mp4"
    },
    {
        name: "flv",
        type: "video/x-flv"
    },
    {
        name: "m3u8",
        type: "application/x-mpegURL"
    },
    {
        name: "ts",
        type: "video/MP2T"
    },
    {
        name: "3gp",
        type: "video/3gpp"
    },
    {
        name: "mov",
        type: "video/quicktime"
    },
    {
        name: "3gp",
        type: "video/3gpp"
    },
    {
        name: "avi",
        type: "video/x-msvideo"
    },
    {
        name: "wmv",
        type: "video/x-ms-wmv"
    },
    {
        name: "mkv",
        type: "video/x-matroska"
    },
];

//AWS Credentials
config.AWS = {
    S3Region: "ap-south-1",
    S3AccessKey: "L",
    S3Secret: "dj",
    S3Bucket: "",
    S3URL: "/"
};

//Admin Dashboard Config
config.AdminID = 'ADMIN123456789-0123456789-';
config.SessionID = 'SESSION123456789--SESSION123456789';

//Application Secret Credentials
config.SECRETCODE = "EDFGJS-DHSHAJ-DASHJDJH-DHJSGAJH";
config.SECRET_OTP_CODE = 5;
config.SECRET_API_KEY = "API123";
config.SECRET_SESSIONID = 'TESTING123';
config.SECRET_JOURNEY_OTP = 9;

config.msg91 = {
    "authkey": "",
    "sender_id": "GKHANA",
    "route_no": "4",
    "baseURL": '',
}

module.exports = config;