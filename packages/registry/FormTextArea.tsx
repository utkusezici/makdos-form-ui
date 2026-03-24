import Generic from "./Generic";
import type { GenericProps } from "./Generic";
import TextArea from "./components/TextArea";
import type { ITextArea } from "./components/TextArea";

interface FormTextAreaProps
  extends ITextArea,
    Omit<GenericProps, "children"> {
  ["name"]: string;
}

function FormTextArea(props: FormTextAreaProps) {
  return (
    <Generic {...props}>
      {({ field, fieldState }) => <TextArea error={fieldState.error?.message} field={field} {...field} {...props} />}
    </Generic>
  );
}

export default FormTextArea;
