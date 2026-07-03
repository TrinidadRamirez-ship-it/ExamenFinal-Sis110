package com.sicjac.backend.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException() {
        super("Ya existe una cuenta registrada con ese correo electrónico.");
    }
}
