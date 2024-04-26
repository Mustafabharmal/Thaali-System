FROM alpine:latest

# Install dependencies
RUN apk update && apk add --no-cache openjdk20

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container at /app
COPY ThaaliSystemSpring-0.0.1-SNAPSHOT.jar /app/ThaaliSystemSpring-0.0.1-SNAPSHOT.jar

# Expose the port that the Spring Boot application will run on
EXPOSE 8080

# Specify the command to run your application
CMD ["java", "-jar", "ThaaliSystemSpring-0.0.1-SNAPSHOT.jar"]
