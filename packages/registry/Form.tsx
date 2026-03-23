"use client"
import { PropsWithChildren, useEffect, useRef } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> extends PropsWithChildren {
  methods?: UseFormReturn<T, any>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T, isCtrlS: boolean) => void; // isCtrlS parametresini ekleyin
  onMethods?: (methods: UseFormReturn<T>) => void;
  resettable?: boolean // Formun sıfırlanmasını istediğimizde true olacak
}

export type SubmitFunction<T extends FieldValues = FieldValues> = (data: T, isCtrlS: boolean) => void;

function Form<T extends FieldValues = FieldValues>(props: Props<T>) {
  const defaultMethods = useForm({ defaultValues: props.defaultValues });
  const methods = props.methods ?? defaultMethods;
  const isCtrlS = useRef(false);

  useEffect(() => {
    if (props.defaultValues, !props.resettable) {
      methods.reset(props.defaultValues);
    }
  }, [props.defaultValues, methods]);

  useEffect(() => {
    if (props.onMethods) {
      props.onMethods(methods); // methods'u dışarıya gönderiyoruz
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Tarayıcının varsayılan kaydetme işlemini engeller
        isCtrlS.current = true; // Ctrl + S durumunu ayarlayın
        methods.handleSubmit((data) => {
          props.onSubmit(data, isCtrlS.current);
          isCtrlS.current = false; // Submit işleminden sonra sıfırlayın
        })();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [methods, props.onSubmit]);

  const handleFormSubmit = (data: T) => {
    props.onSubmit(data, isCtrlS.current);
    isCtrlS.current = false; // Her submit'ten sonra sıfırlayın
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
