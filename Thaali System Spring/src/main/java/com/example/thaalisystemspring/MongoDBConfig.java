package com.example.thaalisystemspring;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.types.ObjectId;

@Configuration
@EnableMongoRepositories(basePackages   = "com.example.thaalisystemspring")
public class MongoDBConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "thaalisystem"; // Replace with your actual database name
    }

    @Override
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb+srv://trial:trial@trial.kupis9i.mongodb.net/"); // Replace with your MongoDB connection string
    }
}
