package org.doxalab

import io.circe
import io.circe.parser.decode
import io.circe._
import io.circe.generic.semiauto._
import io.circe.syntax.EncoderOps

case class EmailTask(recipient: String, message: String)


object EmailTask {
  implicit val emailTaskDecoder: Decoder[EmailTask] = deriveDecoder[EmailTask]
  implicit val emailTaskEncoder: Encoder[EmailTask] = deriveEncoder[EmailTask]

  def execute(emailTask: EmailTask): Unit = println(emailTask)

  def toJson(emailTask: EmailTask): Json = emailTask.asJson
  def toString(emailTask: EmailTask): String = toJson(emailTask).toString()
  def fromString(emailTaskString: String): Either[circe.Error, EmailTask] = decode[EmailTask](emailTaskString)
}

