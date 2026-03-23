import SelectBox, { ISelectBox } from './components/SelectBox';
import { useEffect, useState, useRef } from 'react';
import Generic, { GenericProps } from './Generic';

interface FormSelectBoxProps extends ISelectBox, Omit<GenericProps, "children"> {
  name: string;
  formDefaultValue?: any;
}

function FormSelectBox(props: FormSelectBoxProps) {
  const [selectedFormItems, setSelectedFormItems] = useState(props.defaultSelect);
  const fieldRef = useRef<any>(null);

  // Çoklu seçimde checked olanları form field'ına aktarmak için
  useEffect(() => {
    if (props.multiSelect && props.items && fieldRef.current) {
      const checkedItems = props.items.filter((x: any) => x?.checked);
      // Sadece farklıysa güncelle
      if (JSON.stringify(checkedItems) !== JSON.stringify(fieldRef.current.value)) {
        fieldRef.current.onChange(checkedItems);
      }
    }
  }, [props.items, props.multiSelect]);

  useEffect(() => {
    if (props.selectedItems) {
      setSelectedFormItems(props.selectedItems)
    }
  }, [props.selectedItems])

  return (
    <Generic {...props} resetValue={!selectedFormItems && "reset"}>
      {({ field, fieldState }) => {
        // Field referansını güncelle
        fieldRef.current = field;

        return (
          <SelectBox
            {...field}
            {...props}
            formSelectBox
            selectedItems={props.selectedItems ? props.selectedItems : selectedFormItems}
            setSelectedItems={props.setSelectedItems ? props.setSelectedItems : setSelectedFormItems}
            formDefaultValue={props.formDefaultValue ? props.formDefaultValue : field.value && !field.value?.value ? field.value : null}
            error={fieldState.error}
            field={field}
          />
        );
      }}
    </Generic>
  );
}

export default FormSelectBox;
