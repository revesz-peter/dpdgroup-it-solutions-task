import { act, renderHook } from "@testing-library/react";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Person } from "@/services/types";
// import calls from service to communicate with backend

interface PersonStore {
  persons: Person[];
  addPerson: (person: Omit<Person, "id">) => void;
  editPerson: (person: Person) => void;
  deletePerson: (id: string) => void;
  depersonalizePerson: (id: string) => void;
}

const usePersonStore = create<PersonStore>((set) => ({
  persons: [],

  addPerson: (person) =>
    set((state) => ({
      persons: [...state.persons, { ...person, id: uuidv4() }],
    })),

  editPerson: (updatedPerson) =>
    set((state) => ({
      persons: state.persons.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      ),
    })),

  deletePerson: (id) =>
    set((state) => ({
      persons: state.persons.filter((person) => person.id !== id),
    })),

  depersonalizePerson: (id) =>
    set((state) => ({
      persons: state.persons.map((person) =>
        person.id === id
          ? {
              id: person.id,
              firstName: "Anonymized",
              lastName: "Anonymized",
              birth: {
                date: "",
                place: "",
              },
              mothersMaidenName: "",
              tajNumber: "",
              taxId: "",
              email: "",
              phoneNumber: "",
              address: [],
            }
          : person
      ),
    })),
}));
describe("usePersonStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => usePersonStore());
    act(() => {
      result.current.persons = [];
    });
  });

  it("should add a person", () => {
    const { result } = renderHook(() => usePersonStore());
    const newPerson: Omit<Person, "id"> = {
      firstName: "John",
      lastName: "Doe",
      birth: {
        date: "1990-01-01",
        place: "City",
      },
      mothersMaidenName: "Jane Doe",
      tajNumber: "123456789",
      taxId: "987654321",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      address: [
        {
          postalCode: "1234",
          city: "City",
          street: "Main St",
          houseNumber: "1",
        },
      ],
    };

    act(() => {
      result.current.addPerson(newPerson);
    });

    expect(result.current.persons).toHaveLength(1);
    expect(result.current.persons[0].firstName).toBe("John");
    expect(result.current.persons[0].lastName).toBe("Doe");
  });

  it("should depersonalize a person", () => {
    const { result } = renderHook(() => usePersonStore());
    const newPerson: Omit<Person, "id"> = {
      firstName: "John",
      lastName: "Doe",
      birth: {
        date: "1990-01-01",
        place: "City",
      },
      mothersMaidenName: "Jane Doe",
      tajNumber: "123456789",
      taxId: "987654321",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      address: [
        {
          postalCode: "1234",
          city: "City",
          street: "Main St",
          houseNumber: "1",
        },
      ],
    };

    act(() => {
      result.current.addPerson(newPerson);
    });

    const personId = result.current.persons[0].id;

    act(() => {
      result.current.depersonalizePerson(personId);
    });

    const depersonalizedPerson = result.current.persons[0];

    expect(depersonalizedPerson.firstName).toBe("Anonymized");
    expect(depersonalizedPerson.lastName).toBe("Anonymized");
    expect(depersonalizedPerson.birth.date).toBe("");
    expect(depersonalizedPerson.birth.place).toBe("");
    expect(depersonalizedPerson.mothersMaidenName).toBe("");
    expect(depersonalizedPerson.tajNumber).toBe("");
    expect(depersonalizedPerson.taxId).toBe("");
    expect(depersonalizedPerson.email).toBe("");
    expect(depersonalizedPerson.phoneNumber).toBe("");
    expect(depersonalizedPerson.address).toHaveLength(0);
  });

  it("should edit a person", () => {
    const { result } = renderHook(() => usePersonStore());
    const newPerson: Omit<Person, "id"> = {
      firstName: "John",
      lastName: "Doe",
      birth: {
        date: "1990-01-01",
        place: "City",
      },
      mothersMaidenName: "Jane Doe",
      tajNumber: "123456789",
      taxId: "987654321",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      address: [
        {
          postalCode: "1234",
          city: "City",
          street: "Main St",
          houseNumber: "1",
        },
      ],
    };

    act(() => {
      result.current.addPerson(newPerson);
    });

    const personId = result.current.persons[0].id;

    const updatedPerson: Person = {
      ...newPerson,
      id: personId,
      firstName: "John",
      lastName: "Smith",
    };

    act(() => {
      result.current.editPerson(updatedPerson);
    });

    const editedPerson = result.current.persons[0];

    expect(editedPerson.firstName).toBe("John");
    expect(editedPerson.lastName).toBe("Smith");
  });

  it("should delete a person", () => {
    const { result } = renderHook(() => usePersonStore());
    const newPerson: Omit<Person, "id"> = {
      firstName: "John",
      lastName: "Doe",
      birth: {
        date: "1990-01-01",
        place: "City",
      },
      mothersMaidenName: "Jane Doe",
      tajNumber: "123456789",
      taxId: "987654321",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      address: [
        {
          postalCode: "1234",
          city: "City",
          street: "Main St",
          houseNumber: "1",
        },
      ],
    };

    act(() => {
      result.current.addPerson(newPerson);
    });

    const personId = result.current.persons[0].id;

    act(() => {
      result.current.deletePerson(personId);
    });

    expect(result.current.persons).toHaveLength(0);
  });
});
