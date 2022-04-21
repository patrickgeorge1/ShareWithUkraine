package org.doxalab

import io.circe.syntax._


/**
 * Hello world!
 *
 */
object App {
  def main(args: Array[String]): Unit = {
      KafkaConsumer.forEach(EmailTask.execute)
  }
}
