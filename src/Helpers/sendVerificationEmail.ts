import { Resend } from 'resend';
import EmailTemplate from '../Components/emailTemplate';

const resend = new Resend('re_fcghBeCx_ULz4kp2bQRcpaXKfa8RuXVns');

export default async function sendVerificationEmail(
  email: string,
  userName: string,
  otp: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'alijan998457@gmail.com',
      to: email,
      subject: 'Verify your email address',
      react: EmailTemplate({ userName, otp })
    });

    if (error) {
      console.log(error)
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Error sending verification email:", err);
    return { success: false, message: "Internal server error" };
  }
}

