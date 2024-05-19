import React, { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { EditingPerson } from "@/services/types";

interface EditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  editingPerson: EditingPerson | null;
  onSubmit: SubmitHandler<EditingPerson>;
}

const EditSheet: React.FC<EditSheetProps> = ({ isOpen, onClose, editingPerson, onSubmit }) => {
  const form = useForm<EditingPerson>({
    resolver: zodResolver(editFormSchema),
    mode: "onChange",
  });

  const {
    fields: addressFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "address",
  });

  useEffect(() => {
    if (editingPerson) {
      form.reset(editingPerson);
      form.setValue("address", editingPerson.address);
    }
  }, [editingPerson, form]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit customer: {editingPerson?.firstName} {editingPerson?.lastName}</SheetTitle>
          <SheetDescription className="pb-6">You can change the following fields</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              defaultValue={editingPerson?.email}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              defaultValue={editingPerson?.phoneNumber}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone number</FormLabel>
                  <Input placeholder="Phone number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="tajNumber"
                defaultValue={editingPerson?.tajNumber}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>TAJ number</FormLabel>
                    <Input placeholder="TAJ number" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxId"
                defaultValue={editingPerson?.taxId}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tax ID</FormLabel>
                    <Input placeholder="Tax ID" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {addressFields.map((item, index) => (
              <div key={item.id}>
                {index > 0 && <Separator />}
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`address.${index}.postalCode`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Zip code</FormLabel>
                        <Input placeholder="Zip code" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`address.${index}.city`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>City</FormLabel>
                        <Input placeholder="City" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`address.${index}.street`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Street</FormLabel>
                        <Input placeholder="Street" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`address.${index}.houseNumber`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>House</FormLabel>
                        <Input placeholder="House" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => remove(index)}
                  className="self-end mt-2"
                  disabled={addressFields.length === 1}
                >
                  Remove Address
                </Button>
              </div>
            ))}
            {addressFields.length === 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    postalCode: "",
                    city: "",
                    street: "",
                    houseNumber: "",
                  })
                }
              >
                Add secondary address
              </Button>
            )}
            <SheetFooter>
              <Button type="submit" className="my-4 w-full">
                Save changes
              </Button>
            </SheetFooter>
          </Form>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;
