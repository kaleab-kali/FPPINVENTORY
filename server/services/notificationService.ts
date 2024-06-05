import Notification from '../models/notificationModel';
import nodemailer from 'nodemailer';
import Employee from "../models/employeeModel";

class NotificationService {
    async createNotification(userId: string, title: string, message: string) {
      const notification = new Notification({ userId, title, message });
      await notification.save();
  
      // Send email notifications for dispatch and return actions
      if (title.includes('Dispatch') || title.includes('Return')) {
        const user = await Employee.findById(userId); 
        if (user && user.email) {
          await this.sendEmailNotification(user.email, title, `You have a new notification: ${message}`);
        }
      }
    }

    async getNotificationsForUser(userId: string) {
        return await Notification.find({ userId });
      }

    async markNotificationAsRead(notificationId: string) {
        return await Notification.findByIdAndUpdate(notificationId, { isRead: true });
      }
  
    async sendEmailNotification(userEmail: string, subject: string, message: string) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS,
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject,
        text: message
      };
  
      await transporter.sendMail(mailOptions);
    }
  }

  export default new NotificationService();
  