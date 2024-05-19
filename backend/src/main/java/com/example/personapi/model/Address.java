package com.example.personapi.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class Address {
    private String postalCode;
    private String city;
    private String street;
    private String houseNumber;
}
