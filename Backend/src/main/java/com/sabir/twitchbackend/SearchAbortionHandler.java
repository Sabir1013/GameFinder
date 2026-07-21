package com.sabir.twitchbackend;

import org.apache.catalina.connector.ClientAbortException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class SearchAbortionHandler {

    @ExceptionHandler(ClientAbortException.class)
    public void handleClientAbortException() {}
}