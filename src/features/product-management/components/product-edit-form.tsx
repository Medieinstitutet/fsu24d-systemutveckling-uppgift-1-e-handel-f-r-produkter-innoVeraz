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
import { useEffect } from "react";

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

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image_url?: string;
}

export default function ProductEditForm({
  product,
  onSaved = () => {},
  onCancel = () => {},
}: {
  product: Product;
  onSaved?: () => void;
  onCancel?: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      stock: product.stock || 0,
      category: product.category || "",
      image_url: product.image_url || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      stock: product.stock || 0,
      category: product.category || "",
      image_url: product.image_url || "",
    });
  }, [product, form]);

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Produkt uppdaterad!");
        onSaved();
      } else {
        alert("Något gick fel vid uppdatering");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Ett fel uppstod vid uppdatering av produkten");
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
                <Select {...field} defaultValue={field.value}>
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
        <div className="flex space-x-2">
          <Button type="submit">Spara ändringar</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Avbryt
          </Button>
        </div>
      </form>
    </Form>
  );
}