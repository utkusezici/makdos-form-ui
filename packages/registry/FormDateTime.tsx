import Generic from "./Generic";
import type { GenericProps } from "./Generic";
import DateTime from "./components/DateTime";
import type { IDateTime } from "./components/DateTime";

interface FormDateTimeProps
  extends IDateTime,
    Omit<GenericProps, "children"> {
  ["name"]: string;
}

function FormDateTime(props: FormDateTimeProps) {
  return (
    <Generic {...props}>
      {({ field, fieldState }) => <DateTime error={fieldState.error?.message} {...field} {...props}  value={field.value} />}
    </Generic>
  );
}

export default FormDateTime;
