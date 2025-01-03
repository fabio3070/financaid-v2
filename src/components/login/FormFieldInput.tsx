import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormFieldInputProps<T extends FieldValues> {
  name: Path<T>;
  description: string;
  control: Control<T>;
}

export function FormFieldInput<T extends FieldValues>({
  name,
  description,
  control
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input placeholder={name} {...field} />
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}