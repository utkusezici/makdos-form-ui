import Generic, { GenericProps } from  "./Generic";
import DateTime,{IDateTime} from "./components/DateTime";

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
