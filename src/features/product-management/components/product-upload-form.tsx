"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

const productCategories = [
  "Inomhusväxter",
  "Utomhusväxter",
  "Odla",
];

const productSchema = z.object({
  name: z.string().min(1, "Produktnamn krävs"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Pris krävs"),
  stock: z.coerce.number().min(0, "Lager krävs"),
  category: z.string().optional(),
  image_url: z.string().url("Måste vara en giltig URL").optional(),
});

export default function ProductForm({ onProductSaved = () => {} }) {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      image_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      alert("Produkt sparad!");
      form.reset();
      onProductSaved();
    } else {
      alert("Något gick fel");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivning</FormLabel>
              <FormControl>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pris</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="stock"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lager</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Select {...field} defaultValue="">
                  <option value="" disabled>
                    Välj kategori
                  </option>
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="image_url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bild-URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Spara produkt</Button>
      </form>
    </Form>
  );
}
