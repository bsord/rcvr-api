
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: string, url: string, template: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //const testAccount = await nodemailer.createTestAccount();
    const sendingDomain = process.env.SENDER_DOMAIN
    const websiteDomain = process.env.WEBSITE_DOMAIN
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.RELAYHOST ? process.env.RELAYHOST : "",
        port: process.env.RELAYPORT ? parseInt(process.env.RELAYPORT) : undefined,
        secure: false
    });

    if(template == 'forgotpassword'){
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"' + websiteDomain + ' - Password Assistance" <Support@' + sendingDomain + '>', // sender address
            to: email, // list of receivers
            subject: 'Forgot password request', // Subject line
            text: 'It looks like you have submitted a request to reset your password, please follow the link below to change your password', // plain text body
            html: `<h2>It looks like you have submitted a request to reset your password</h2> <p>Please follow the link below to change your password</p></br><a href="${url}">Reset Password</a>` // html body
        });
        console.log('Message sent: %s', info.messageId);
    }

    if(template == 'newuser'){
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"' + websiteDomain + ' - User Confirmation" <Confirmation@' + sendingDomain + '>', // sender address
            to: email, // list of receivers
            subject: 'Please confirm your ' + websiteDomain + ' account', // Subject line
            text: 'Thank you for registering with ' + websiteDomain + '! Please follow the link below to confirm your account.', // plain text body
            html: `<h2>Thank you for registering with ` + websiteDomain + `!</h2> <p>Please follow the link below to confirm your account.</p></br><a href="${url}">Confirm Account</a>` // html body
        });
        console.log('Message sent: %s', info.messageId);
    }

}
