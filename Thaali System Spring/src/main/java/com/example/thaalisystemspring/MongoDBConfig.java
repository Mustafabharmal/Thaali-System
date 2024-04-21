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
        return "ThaliSystem"; // Replace with your actual database name
    }

    @Override
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb+srv://mustafabharmal178:mustafa@thaalisystem.jqmnlib.mongodb.net/?retryWrites=true&w=majority"); // Replace with your MongoDB connection string
    }
}
