import nodemailer from "nodemailer";
import INodemailer from "../../usecaseLayer/interface/services/Inodemailer";

class NodeMailer implements INodemailer {
    private otps: Map<string, string> = new Map();


    // to genereate otp
    generateOTP(): string {

        console.log('entered otp')
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    //to send the mail

    async sendEmailVerification(
        email: string,
        username: string
    ): Promise<string> {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.SMTP_PASS,
                },
            });

            if (this.otps) {
                this.otps.clear();
            }

            const otp = this.generateOTP();
            this.otps.set(email, otp);

            const mailOptions = {
                from: "farzinahammedabc@gmail.com",
                to: email,
                subject: "Email Verification",
                html: `<div style="width: 90%; background-color: #007bff; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 40px;">
                        <h2 style="font-size: 24px; color: #333333; margin-bottom: 20px; text-align: center;">Hi ${username}, Welcome to Our MEETHUB!</h2>
                        <p style="font-size: 18px; color: #666666; margin-bottom: 30px; text-align: center;">Please use the following OTP to verify your account:</p>
                        <div style="text-align: center; margin-bottom: 40px;">
                            <h1 style="font-size: 48px; color: #ffffff; background-color: #007bff; padding: 10px 20px; border-radius: 5px;">${otp}</h1>
                        </div>
                        <p style="font-size: 16px; color: #666666; margin-bottom: 20px; text-align: center;">This OTP is valid for a limited time.</p>
                        <p style="font-size: 16px; color: #666666; margin-bottom: 0; text-align: center;">Thank you for joining!</p>
                    </div>
                </div>
            </div> `,
            };

            await transporter.sendMail(mailOptions);
            return "Hey please check your email";
        } catch (error) {
            throw new Error(
                `Unable to send email verification email to ${email}: ${error}`
            );
        }
    }

    //verify mail
    async verifyEmail(enteredOtp: string, email: string): Promise<boolean> {
        try {

            const expectedOTP = this.otps.get(email);
            if (expectedOTP === enteredOtp) {
                this.otps.delete(email);
                return true;
            } else {
                return false;
            }

        } catch (error) {

            throw new Error('Worng otp')

        }
    }
}

export default NodeMailer;
