import Generic, { GenericProps } from  "./Generic";
import TextInput, { ITextInput } from "./components/TextInput";

interface FormTextInputProps
  extends ITextInput,
    Omit<GenericProps, "children"> {
  ["name"]: string;
}

function FormTextInput(props: FormTextInputProps) {
  return (
    <Generic {...props}>
      {({ field, fieldState }) => <TextInput error={fieldState.error?.message} field={field} {...field} {...props} />}
    </Generic>
  );
}

export default FormTextInput;
