"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
//*****************************Configuration object */
let config = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.user,
        pass: process.env.password
    }
};
//**************************CREATE A TRANSPORTER********************* */
function createTransporter(config) {
    return nodemailer_1.default.createTransport(config);
}
//*****************************SEND EMAIL********************* */
function sendEmail(messageOption) {
    return __awaiter(this, void 0, void 0, function* () {
        let transpoter = createTransporter(config);
        yield transpoter.verify();
        yield transpoter.sendMail(messageOption, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log(info);
        });
    });
}
let messageOption = {
    to: process.env.EMAIL,
    from: process.env.EMAIL,
    subject: 'Regestration Successful',
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 5px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            color: #333333;
        }
        .content {
            font-size: 16px;
            color: #555555;
        }
        .content p {
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome,Jethro!</h1>
        </div>
        <div class="content">
            <p>Dear Jethro,</p>
            <p>Thank you for registering with our service. Your account has been successfully created.</p>
            
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,</p>
            <p>The Team</p>
        </div>
        <div class="footer">

        </div>
    </div>
</body>
</html>

    
    
    `
};
