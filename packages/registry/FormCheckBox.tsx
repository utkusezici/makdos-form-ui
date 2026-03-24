import { useEffect } from "react";
import Generic from "./Generic";
import type { GenericProps } from "./Generic";
import CheckBox from "./components/CheckBox";
import type { ICheckBox } from "./components/CheckBox";
import { useFormContext } from "react-hook-form";

interface FormCheckboxProps extends ICheckBox, Omit<GenericProps, "children"> {
  name: string;
}

function FormCheckBox(props: FormCheckboxProps) {
  const { setValue, watch } = useFormContext();
  const checked = watch(props.name);
  useEffect(() => {
    if (props.defaultValue){
      setValue(props.name, props.defaultValue);
    }else{
      setValue(props.name, false);
    }
     
  }, [ props.name]);

  return (
    <Generic {...props}>
      {({ field, fieldState }) => (
        <CheckBox
          {...field}
          {...props}
          onChange={(newChecked) => {
            setValue(props.name, newChecked);
          }}
          checked={checked !== undefined ? checked :( props.defaultValue ? props.defaultValue : false)}
          error={fieldState.error}
          isForm={true}
        />
      )}
    </Generic>
  );
}

export default FormCheckBox;
