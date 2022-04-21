package org.doxalab

import java.time.Duration
import java.util.Properties
import scala.collection.JavaConverters._
import org.apache.kafka.clients.consumer.KafkaConsumer

object KafkaConsumer {
  val props: Properties = new Properties()
  props.put("group.id", "email-sender")
  props.put("bootstrap.servers","localhost:9092")
  props.put("key.deserializer",
    "org.apache.kafka.common.serialization.StringDeserializer")
  props.put("value.deserializer",
    "org.apache.kafka.common.serialization.StringDeserializer")
  props.put("enable.auto.commit", "true")
  props.put("auto.commit.interval.ms", "1000")

  val consumer = new KafkaConsumer(props)
  val topics = List("email-tasks")

  def forEach(task: EmailTask => Unit): Unit = try {
    consumer.subscribe(topics.asJava)
    while (true) {
      val records = consumer.poll(Duration.ofMillis(100))
      for (record <- records.asScala) {
        val topic = record.topic()
        val key = if(record.key() != null) record.key().toString else "null"
        val value = if(record.value() != null) record.value().toString else "null"
        val offset = record.offset()
        val partition = record.partition()

        println("\nTopic: " + topic +
          ",Key: " + key +
          ",Value: " + value +
          ", Offset: " + offset +
          ", Partition: " + partition)

        val emailTaskDecode = EmailTask.fromString(value)
        if (emailTaskDecode.isRight) {
          val emailTask = emailTaskDecode.right.get
          try { task(emailTask) } catch { case e: Exception => e.printStackTrace() }
        } else {
          println(s"[Conversion error => message: $value] " + emailTaskDecode.left.get)
        }
      }
    }
  }catch{
    case e:Exception => e.printStackTrace()
  }finally {
    consumer.close()
  }
}
