FROM adoptopenjdk/openjdk16:jdk-16.0.1_9-alpine

ENV KAFKA_STREAMED_EMAIL_SENDER_HOME=/home
WORKDIR $KAFKA_STREAMED_EMAIL_SENDER_HOME

COPY ./KafkaStreamedEmailSender/target/KafkaStreamedEmailSender-1.0-SNAPSHOT-jar-with-dependencies.jar $KAFKA_STREAMED_EMAIL_SENDER_HOME

EXPOSE 9092

ENTRYPOINT ["java", "-jar", "KafkaStreamedEmailSender-1.0-SNAPSHOT-jar-with-dependencies.jar"]