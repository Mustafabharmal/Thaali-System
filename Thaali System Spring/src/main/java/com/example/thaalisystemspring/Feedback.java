package com.example.thaalisystemspring;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;

@Document(collection = "feedback")
public class Feedback {

    @Id
    private String _id;
    @Field("userid")
    private String userid;
    @Field("communityid")
    private String communityid;
    private String type;
    private String title;
    private String description;
    private int status = 1; // Default value
    private String date; // Assuming date is stored as string
    private String completed = "pending"; // Default value
    private double createdat = System.currentTimeMillis(); // Default value
    private double updatedat = System.currentTimeMillis(); // Default value

    // No-args constructor
    public Feedback() {

    }

    // Getters and setters...

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getCommunityid() {
        return communityid;
    }

    public void setCommunityid(String communityid) {
        this.communityid = communityid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public double getCreatedat() {
        return createdat;
    }

    public void setCreatedat(double createdat) {
        this.createdat = createdat;
    }

    public double getUpdatedat() {
        return updatedat;
    }

    public void setUpdatedat(double updatedat) {
        this.updatedat = updatedat;
    }
}
