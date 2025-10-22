package com.ashimeru.personalfinance.demo_auth_service.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.ashimeru.personalfinance.demo_auth_service.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {
  @Autowired
  private JavaMailSender emailSender;

  @Override
  public boolean sendVerificationEmail(String email, String url)
      throws MessagingException {

    MimeMessage message = emailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    String subject = "Account Verification";
    String htmlMessage =
        """
                <html>
                  <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Welcome to Our App!</h2>
                    <p>Hi there,</p>
                    <p>Thanks for signing up. Please verify your email address by clicking the link below:</p>
                    <p>
                      <a href="%s" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                        Verify Email
                      </a>
                    </p>
                    <p>If you didn't request this, just ignore this email.</p>
                    <p>– The Team</p>
                  </body>
                </html>
            """
            .formatted(url);

    helper.setTo(email);
    helper.setSubject(subject);
    helper.setText(htmlMessage, true);

    emailSender.send(message);
    return true;
  }

  @Override
  public boolean sendPasswordResetEmail(String email, String url) 
  throws MessagingException {
    MimeMessage message = emailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    String subject = "Password Reset";
    String htmlMessage =
        """
                <html>
                  <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Reset Password</h2>
                    <p>Click the link below to reset the password in 15 minutes.</p>
                    <p>
                      <a href="%s" style="background-color:rgb(176, 64, 64); color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                        Reset Password
                      </a>
                    </p>
                    <p>Click the link below to reset the password in 15 minutes.</p>
                    <p>If you didn't request this, just ignore this email.</p>
                    <p>– The Team</p>
                  </body>
                </html>
            """
            .formatted(url);

    helper.setTo(email);
    helper.setSubject(subject);
    helper.setText(htmlMessage, true);

    emailSender.send(message);
    return true;
  }
}
