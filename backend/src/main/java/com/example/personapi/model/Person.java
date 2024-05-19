package com.example.personapi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String birthPlace;
    private String mothersMaidenName;
    private String tajNumber;
    private String taxId;
    private String email;
    private String phoneNumber;

    @CollectionTable(
            name="person_address",
            joinColumns=@JoinColumn(name="person_id", referencedColumnName="id", nullable = false)
    )
    @OrderColumn(name = "index")
    @ElementCollection(targetClass=Address.class)
    private List<Address> addresses = new ArrayList<>();

}
