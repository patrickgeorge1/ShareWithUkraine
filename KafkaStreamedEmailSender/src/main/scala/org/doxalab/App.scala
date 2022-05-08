package org.doxalab

object App {
  def main(args: Array[String]): Unit = {
      KafkaConsumer.forEach(EmailTask.execute)
  }
}
