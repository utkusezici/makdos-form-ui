import { useEffect } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  UseControllerReturn,
  useForm,
  useFormContext,
} from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> {
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<FieldValues, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  children: (
    controller: UseControllerReturn<FieldValues, Path<T>> & {
      setValue: (value: any) => void;
    }
  ) => any;
  resetValue?: any;
}

function Generic<T extends FieldValues = FieldValues>(props: Props<T>) {
  const formMethods = useFormContext();
  const controller = useController({
    name: props.name as Path<T>,
    control: formMethods.control,
    rules: props.rules,
  });

  useEffect(() => {
    if (props.resetValue) {
      formMethods.setValue(props.name as string, "");
    }
  }, [props.resetValue])

  return props.children({
    ...controller,
    setValue(value) {
      formMethods.setValue(props.name, value);
    },
  });
}

export type GenericProps = Props;
export default Generic;
