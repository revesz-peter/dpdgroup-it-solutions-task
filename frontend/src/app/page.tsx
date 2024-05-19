"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import usePersonStore from "@/store/person";
import { useFormStatus } from "react-dom";

const Home = () => {
  const router = useRouter();
  const addPerson = usePersonStore((state) => state.addPerson);
  const persons = usePersonStore((state) => state.persons);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birth: { date: "", place: "" },
      mothersMaidenName: "",
      tajNumber: "",
      taxId: "",
      email: "",
      phoneNumber: "",
      address: [{ postalCode: "", city: "", street: "", houseNumber: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "address",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      addPerson({
        firstName: data.firstName,
        lastName: data.lastName,
        birth: {
          date: data.birth.date,
          place: data.birth.place
        },
        mothersMaidenName: data.mothersMaidenName,
        tajNumber: data.tajNumber,
        taxId: data.taxId,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address
      });
      toast("Customer created");
      form.reset();
      router.push("/list");
    } catch (error) {
      toast("An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Current state of persons:', persons);
  }, [persons]);

  const { pending } = useFormStatus();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Add customer</CardTitle>
          <CardDescription>Fill out the fields below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-md w-full flex flex-col gap-4"
            >
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>First name</FormLabel>
                        <FormControl />
                        <Input placeholder="First name" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>Last name</FormLabel>
                        <FormControl />
                        <Input placeholder="Last name" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="birth.date"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>Birthday</FormLabel>
                        <FormControl />
                        <Input placeholder="YYYY-MM-DD" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="birth.place"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>Birthplace</FormLabel>
                        <FormControl />
                        <Input placeholder="Birthplace" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="mothersMaidenName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Mother&apos;s maiden name</FormLabel>
                      <FormControl />
                      <Input placeholder="Mother's maiden name" {...field} />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="tajNumber"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>TAJ number</FormLabel>
                        <FormControl />
                        <Input placeholder="TAJ number" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl />
                        <Input placeholder="Tax ID" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl />
                        <Input placeholder="Email" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>Phone number</FormLabel>
                        <FormControl />
                        <Input placeholder="Phone number" {...field} />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              {fields.map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`address.${index}.postalCode`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Zip code</FormLabel>
                          <FormControl />
                          <Input placeholder="Zip code" {...field} />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`address.${index}.city`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>City</FormLabel>
                          <FormControl />
                          <Input placeholder="City" {...field} />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`address.${index}.street`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>Street</FormLabel>
                          <FormControl />
                          <Input placeholder="Street" {...field} />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`address.${index}.houseNumber`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex-1">
                          <FormLabel>House</FormLabel>
                          <FormControl />
                          <Input placeholder="House" {...field} />
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => remove(index)}
                      className="self-end"
                      disabled={fields.length === 1}
                    >
                      Remove
                    </Button>
                </div>
              ))}
              {fields.length === 1 && (
              <Button type="button" variant="secondary" onClick={() => append({ postalCode: "", city: "", street: "", houseNumber: "" })}>
                Add secondary address
              </Button>)}
              <Button type="submit" className="my-4 w-full">
                {loading ? "Loading..." : "Submit"}
              </Button>
            </form>
            <Link href="/list" className="flex">
              <Button variant="outline" className="font-normal w-full" size="sm" disabled={pending}>
                Back to the list
              </Button>
            </Link>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
