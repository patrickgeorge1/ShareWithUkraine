package org.doxalab

/**
 * Necessary environment variables
 */
object Config {
  val MAIL_USERNAME: String = sys.env("MAIL_USERNAME")
  val MAIL_PASSWORD: String = sys.env("MAIL_PASSWORD")
  val MAIL_SUBJECT: String = sys.env("MAIL_SUBJECT")

  val KAFKA_CONSUMER_GROUP: String = sys.env("KAFKA_CONSUMER_GROUP")
  val KAFKA_BOOTSTRAP_SERVERS: String = sys.env("KAFKA_BOOTSTRAP_SERVERS")
  val KAFKA_TOPIC_NAME: String = sys.env("KAFKA_TOPIC_NAME")
}
