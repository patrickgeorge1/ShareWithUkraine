package org.doxalab

import java.util.Properties
import javax.mail.{Authenticator, PasswordAuthentication, Session}
import javax.mail.Message
import javax.mail.MessagingException
import javax.mail.Transport
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage

object MailSender {

  val username: String = Config.MAIL_USERNAME
  val password: String = Config.MAIL_PASSWORD

  val prop = new Properties()
  prop.put("mail.smtp.host", "smtp.gmail.com")
  prop.put("mail.smtp.port", "465")
  prop.put("mail.smtp.auth", "true")
  prop.put("mail.smtp.socketFactory.port", "465")
  prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory")



  val session: Session = Session.getInstance(prop, new Authenticator {
    override protected def getPasswordAuthentication: PasswordAuthentication =
      new PasswordAuthentication(username, password)
  })

  def send(targetEmail: String, subject: String, messageText: String): Unit = {
    try {
      val message: Message = new MimeMessage(session)
      message.setFrom(new InternetAddress(username))

      message.setRecipient(
        Message.RecipientType.TO,
        new InternetAddress(targetEmail)
      )

      message.setSubject(subject)
      println(s"Sending message to $targetEmail...")
      message.setText(messageText)
      Transport.send(message)
      System.out.println("Sent")
    } catch {
      case e: MessagingException =>
        e.printStackTrace()
    }
  }
}
