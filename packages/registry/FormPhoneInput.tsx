import PhoneInput from './components/PhoneInput';
import type { IPhoneInput } from './components/PhoneInput';
import { useState } from 'react';
import Generic from './Generic';
import type { GenericProps } from './Generic';

interface FormPhoneInputProps extends IPhoneInput, Omit<GenericProps, "children"> {
  name: string;
}

function FormPhoneInput(props: FormPhoneInputProps) {
  const [, setPhone] = useState("");
  return (
    <Generic {...props}>
      {({ field, fieldState }) => (
        <PhoneInput
          {...field}
          {...props}
          search
          value={field.value}
          setValue={setPhone}
          error={fieldState.error?.message}
        />

      )


      }
    </Generic>
  );
}

export default FormPhoneInput;
