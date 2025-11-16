package com.examly.springapp.exception;

public class SkillShareNotFoundException extends RuntimeException{
    public SkillShareNotFoundException(String message){
        super(message);
    }
}
