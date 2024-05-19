export interface Address {
    postalCode: string;
    city: string;
    street: string;
    houseNumber: string;
  }
  
  export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    birth: {
      date: string;
      place: string;
    };
    mothersMaidenName: string;
    tajNumber: string;
    taxId: string;
    email: string;
    phoneNumber: string;
    address: Address[];
  }
  
  export interface EditingPerson extends Person {}
  