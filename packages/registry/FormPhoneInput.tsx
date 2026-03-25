import PhoneInput from './components/PhoneInput';
import type { IPhoneInput } from './components/PhoneInput';
import Generic from './Generic';
import type { GenericProps } from './Generic';

interface FormPhoneInputProps extends IPhoneInput, Omit<GenericProps, "children"> {
  name: string;
}

function FormPhoneInput(props: FormPhoneInputProps) {
  return (
    <Generic {...props}>
      {({ field, fieldState }) => (
        <PhoneInput
          {...props}
          search
          value={field.value}
          setValue={field.onChange}
          error={fieldState.error?.message}
        />

      )


      }
    </Generic>
  );
}

export default FormPhoneInput;
