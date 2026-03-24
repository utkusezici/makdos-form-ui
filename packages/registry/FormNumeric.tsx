import Generic from "./Generic";
import type { GenericProps } from "./Generic";
import Numeric from "./components/Numeric";
import type { INumeric } from "./components/Numeric";

interface FormNumericProps
  extends INumeric,
    Omit<GenericProps, "children"> {
  ["name"]: string;
}

function FormNumeric(props: FormNumericProps) {
  return (
    <Generic {...props}>
      {({ field, fieldState }) => <Numeric error={fieldState.error?.message} {...field} {...props} field={field} />}
    </Generic>
  );
}

export default FormNumeric;
