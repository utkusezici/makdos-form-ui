import { useEffect } from "react";
import Generic from "./Generic";
import type { GenericProps } from "./Generic";
import { useFormContext } from "react-hook-form";
import Toggle from "./components/Toggle";
import type { IToggle } from "./components/Toggle";

interface FormToggleProps extends IToggle, Omit<GenericProps, "children"> {
  name: string;
  defaultValue?: boolean;
  isCheck?: boolean;
  setIsCheck?: any;
  triggerFunction?: any;
}

function FormToggle(props: FormToggleProps) {
  const { setValue, watch } = useFormContext();
  const checked = watch(props.name);


  useEffect(() => {
      if (checked === undefined) {
          setValue(props.name, props.defaultValue !== undefined ? props.defaultValue : false);
      }
  }, [setValue, props.name, props.defaultValue, checked ]);

  useEffect(() => {
      if (props.isCheck !== undefined) {
          setValue(props.name, props.isCheck);
      }
  }, [props.isCheck])
  


  return (
    <Generic {...props}>
      {({ field, fieldState }) => (
        <Toggle
          {...field}
          {...props}
          setIsCheck={(newChecked) => {
            setValue(props.name, newChecked);
            props?.setIsCheck &&
            props?.setIsCheck(newChecked)
          }}
          isCheck={checked ? checked : props.defaultValue}
          error={fieldState.error}
        />
      )}
    </Generic>
  );
}

export default FormToggle;
