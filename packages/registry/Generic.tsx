import { useEffect } from "react";
import type { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { FieldValues, Path, PathValue, RegisterOptions, UseControllerReturn } from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> {
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<FieldValues, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  children: (
    controller: UseControllerReturn<FieldValues, Path<T>> & {
      setValue: (value: unknown) => void;
    }
  ) => ReactNode;
  resetValue?: unknown;
}

function Generic<T extends FieldValues = FieldValues>(props: Props<T>) {
  const formMethods = useFormContext<T>();
  const controller = useController({
    name: props.name as Path<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: formMethods.control as any,
    rules: props.rules,
  });

  useEffect(() => {
    if (props.resetValue) {
      formMethods.setValue(props.name, "" as PathValue<T, Path<T>>);
    }
  }, [props.resetValue, props.name]);

  return props.children({
    ...controller,
    setValue(value) {
      formMethods.setValue(props.name, value as PathValue<T, Path<T>>);
    },
  });
}

export type GenericProps = Props;
export default Generic;
