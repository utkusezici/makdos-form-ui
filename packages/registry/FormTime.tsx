import Generic, { GenericProps } from "./Generic";
import Time, { ITime } from "./components/Time";

interface FormTimeProps
    extends ITime,
    Omit<GenericProps, "children"> {
    ["name"]: string;
}

function FormTime(props: FormTimeProps) {
    return (
        <Generic {...props}>
            {({ field, fieldState }) => <Time error={fieldState.error?.message} {...field} {...props} value={field.value} />}
        </Generic>
    );
}

export default FormTime;
