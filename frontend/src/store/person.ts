import { create } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Person } from '@/services/types';
// import calls from service to communicate with backend

interface PersonStore {
  persons: Person[];
  addPerson: (person: Omit<Person, 'id'>) => void;
  editPerson: (person: Person) => void;
  deletePerson: (id: string) => void;
  depersonalizePerson: (id: string) => void;
}

const usePersonStore = create(
  persist(
    (set) => ({
      persons: [],

      addPerson: (person) => set((state) => ({
        persons: [...state.persons, { ...person, id: uuidv4() }],
      })),

      editPerson: (updatedPerson) => set((state) => ({
        persons: state.persons.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        ),
      })),

      deletePerson: (id) => set((state) => ({
        persons: state.persons.filter((person) => person.id !== id),
      })),

      depersonalizePerson: (id) => set((state) => ({
        persons: state.persons.map((person) =>
          person.id === id
            ? {
                id: person.id,
                firstName: 'Anonymized',
                lastName: 'Anonymized',
                birth: {
                  date: '',
                  place: '',
                },
                mothersMaidenName: '',
                tajNumber: '',
                taxId: '',
                email: '',
                phoneNumber: '',
                address: [],
            }
            : person
        ),
      })),

      _hasHydrated: false,
    }),
    {
      name: 'person-storage',
      storage: createJSONStorage(() => sessionStorage),
      // getStorage: () => localStorage,
    } as PersistOptions<PersonStore>
  )
);

export default usePersonStore;