
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: string, url: string, template: string) {
    console.log("sending email")
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
            from: '"' + websiteDomain + ' Support" <Support@' + sendingDomain + '>', // sender address
            to: email, // list of receivers
            subject: 'Forgot Password', // Subject line
            text: 'It looks like you have submitted a request to reset your password, please follow the link below to change your password', // plain text body
            html: `<h2>It looks like you have submitted a request to reset your password</h2> <p>Please follow the link below to change your password</p></br><a href="${url}">Reset Password</a>` // html body
        });
        console.log('Message sent: %s', info.messageId);
    }

    if(template == 'newuser'){
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"' + websiteDomain + ' Support" <Support@' + sendingDomain + '>', // sender address
            to: email, // list of receivers
            subject: 'Verification', // Subject line
            text: 'Thank you for registering with ' + websiteDomain + '! Please follow the link below to confirm your account.', // plain text body
            html: `
                <div style="background-color: #F4F4F6;padding:20px;">
                    <table border="0" cellspacing="0" style="max-width: 750px;margin:0 auto;background-color: #FFFFFF; margin:0 auto;font-size: 16px;font-family: 'Open Sans','Arimo',sans-serif">
                        <tbody>
                            <tr>
                                <td style="background: #2e5090;padding: 50px 0px 0px; width: 100%; text-align: center;"> <img src="https://${websiteDomain}/img/logo192w.png"=width="80px" height="80px" /> </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px 8% 0;font-size: 22px;font-weight: bold">${websiteDomain} email verification</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;color: #000;padding: 0 8% 18px;"> Thank you for registering with ${websiteDomain}, we're excited you've started this journey with us!</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;color: #000;padding: 0 8% 18px;"> Click here to <a href="${url}" style="text-decoration: none; color:#007CFF; cursor:pointer;" rel="no=follow">Verify Account</a>.</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;color: #000;padding: 0 8% 18px;"> Verification link valid for 24 hours. </td>
                            </tr>
                            <tr>
                                <td style="padding: 20px 8% 40px;font-size: 14px;color: #000;"> Sincerely,
                                    <br /> The Rcvr Team </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            `
        });
        console.log('Message sent: %s', info.messageId);
    }

}
