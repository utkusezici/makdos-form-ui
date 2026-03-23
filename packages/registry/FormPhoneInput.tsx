import PhoneInput, { IPhoneInput } from './components/PhoneInput';
import Generic, { GenericProps } from './Generic';

interface FormPhoneInputProps extends IPhoneInput, Omit<GenericProps, "children"> {
  name: string;
}

function FormPhoneInput(props: FormPhoneInputProps) {
  return (
    <Generic {...props}>
      {({ field, fieldState }) => (
        <PhoneInput
          {...field}
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
