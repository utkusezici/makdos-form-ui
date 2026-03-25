import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { DefaultValues, FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> extends PropsWithChildren {
  methods?: UseFormReturn<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T, isCtrlS: boolean) => void;
  onMethods?: (methods: UseFormReturn<T>) => void;
  resettable?: boolean;
}

export type SubmitFunction<T extends FieldValues = FieldValues> = (data: T, isCtrlS: boolean) => void;

function Form<T extends FieldValues = FieldValues>(props: Props<T>) {
  const defaultMethods = useForm({ defaultValues: props.defaultValues });
  const methods = props.methods ?? defaultMethods;
  const isCtrlS = useRef(false);

  useEffect(() => {
    if (props.defaultValues && !props.resettable) {
      methods.reset(props.defaultValues);
    }
  }, [props.defaultValues, methods]);

  useEffect(() => {
    props.onMethods?.(methods);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        isCtrlS.current = true;
        methods.handleSubmit((data) => {
          props.onSubmit(data, isCtrlS.current);
          isCtrlS.current = false;
        })();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [methods, props.onSubmit]);

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    props.onSubmit(data, isCtrlS.current);
    isCtrlS.current = false;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        autoComplete="none"
        aria-autocomplete="none"
        className="w-full"
      >
        {props.children}
      </form>
    </FormProvider>
  );
}

export default Form;
