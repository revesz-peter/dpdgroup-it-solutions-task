package com.example.personapi.service;

import com.example.personapi.model.Person;
import com.example.personapi.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person createPerson( Person person) {
        return personRepository.save(person);
    }

    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public Person updatePerson(Long id, Person personDetails) {
        return personRepository.findById(id).map(person -> {
            person.setFirstName(personDetails.getFirstName());
            person.setLastName(personDetails.getLastName());
            person.setBirthDate(personDetails.getBirthDate());
            person.setBirthPlace(personDetails.getBirthPlace());
            person.setMothersMaidenName(personDetails.getMothersMaidenName());
            person.setTajNumber(personDetails.getTajNumber());
            person.setTaxId(personDetails.getTaxId());
            person.setEmail(personDetails.getEmail());
            person.setPhoneNumber(personDetails.getPhoneNumber());
            person.getAddresses().clear();
            person.getAddresses().addAll(personDetails.getAddresses());
            return person;
        }).orElseGet(() -> {
            personDetails.setId(id);
            return personRepository.save(personDetails);
        });
    }

    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }
}
