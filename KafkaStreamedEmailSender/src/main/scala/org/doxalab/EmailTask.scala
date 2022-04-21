package org.doxalab

import io.circe
import io.circe.parser.decode
import io.circe._
import io.circe.generic.semiauto._
import io.circe.syntax.EncoderOps

/**
 * Represents a kafka message that contain information about the target email and the actual message to be sent.
 * This can be seen as a metadata about the mail that needs to be sent.
 * @param recipient - target email
 * @param message - actual message
 */
case class EmailTask(recipient: String, message: String)

object EmailTask {
  implicit val emailTaskDecoder: Decoder[EmailTask] = deriveDecoder[EmailTask]
  implicit val emailTaskEncoder: Encoder[EmailTask] = deriveEncoder[EmailTask]

  def execute(emailTask: EmailTask): Unit = MailSender.send(emailTask.recipient, Config.MAIL_SUBJECT, emailTask.message)

  def toJson(emailTask: EmailTask): Json = emailTask.asJson
  def toString(emailTask: EmailTask): String = toJson(emailTask).toString()
  def fromString(emailTaskString: String): Either[circe.Error, EmailTask] = decode[EmailTask](emailTaskString)
}

