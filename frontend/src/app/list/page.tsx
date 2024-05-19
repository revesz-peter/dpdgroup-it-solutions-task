"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import { EditingPerson } from "@/services/types";
import EditSheet from "@/components/EditSheet";
import { Separator } from "@/components/ui/separator";
import usePersonStore from "@/store/person";
import { Person } from "@/services/types";

const tableHeaders = {
  firstName: "First Name",
  lastName: "Last Name",
  birthDate: "Birth Date",
  birthPlace: "Birth Place",
  mothersMaidenName: "Mother's Maiden Name",
  tajNumber: "TAJ Number",
  taxId: "Tax ID",
  email: "Email",
  phoneNumber: "Phone Number",
  address: "Address",
  edit: "Edit",
  delete: "Delete",
};

const ListPage: React.FC = () => {
  const persons = usePersonStore((state) => state.persons);
  const deletePerson = usePersonStore((state) => state.deletePerson);
  const editPerson = usePersonStore((state) => state.editPerson);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<EditingPerson | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setIsSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    try {
      deletePerson(id)
      toast(`Successful deletion`, {
        description: new Date().toLocaleString(),
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
    } catch (error) {
      toast("An error occurred, please try again later");
    }
  };

  const handleUpdate = (updatedFields: Partial<EditingPerson>) => {
    try {
      if (editingPerson) {
        const updatedPerson = { ...editingPerson, ...updatedFields };
        editPerson(updatedPerson);
        console.log("Updated Person:", updatedPerson);
        console.log("Persons after update:", usePersonStore.getState().persons);
        toast("Successful edit", {
          description: new Date().toLocaleString(),
        });
        setIsSheetOpen(false);
      }
    } catch (error) {
      toast("An error occurred, please try again later");
    }
  };

  useEffect(() => {
    console.log(persons)
  }, [persons])

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-14">
      <div className="w-full flex justify-end mb-4">
        <Link href="/">
          <Button>Add new customer</Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of customer information.</TableCaption>
        <TableHeader>
          <TableRow>
            {Object.values(tableHeaders).map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
              <TableCell className="w-[150px]">{person.birth.date}</TableCell>
              <TableCell>{person.birth.place}</TableCell>
              <TableCell>{person.mothersMaidenName}</TableCell>
              <TableCell>{person.tajNumber}</TableCell>
              <TableCell>{person.taxId}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.phoneNumber}</TableCell>
              <TableCell>
                {person.address.map((address, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-1"/>} {/* Add separator between addresses */}
                    {`${address.street}, ${address.houseNumber}, ${address.city}, ${address.postalCode}`}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleEdit(person)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleDelete(person.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        editingPerson={editingPerson}
        onSubmit={handleUpdate}
      />
    </main>
  );
};

export default ListPage;
