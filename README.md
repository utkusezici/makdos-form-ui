# Makdos Form UI

A shadcn-style CLI for adding production-ready form components to your React project.

Built with React Hook Form + Tailwind CSS.

## Usage

```bash
# Add a component
npx @makdosdev/form-ui add FormTextInput

# Add multiple components
npx @makdosdev/form-ui add FormTextInput FormSelectBox FormCheckBox

# List all available components
npx @makdosdev/form-ui list
```

## Available Components

| Component | Description |
|-----------|-------------|
| `FormTextInput` | Text input with form integration |
| `FormSelectBox` | Select/dropdown with single & multi-select |
| `FormCheckBox` | Checkbox with form integration |
| `FormTextArea` | Textarea with form integration |
| `FormToggle` | Toggle/switch with form integration |
| `FormNumeric` | Number input with form integration |
| `FormDateTime` | Date & time picker |
| `FormTime` | Time picker |
| `FormPhoneInput` | Phone input with country code |
| `Button` | Button component (5 variants) |
| `RadioButton` | Radio button component |
| `TextEditor` | Rich text editor |
| `Paginate` | Pagination component |
| `ListBox` | List-based selection |
| `SelectBoxGroup` | Grouped select options |
| `FileUploader` | File upload with modal |

## Example

```tsx
import { Form } from '@/components/ui/Form'
import { FormTextInput } from '@/components/ui/FormTextInput'
import { FormSelectBox } from '@/components/ui/FormSelectBox'
import { Button } from '@/components/ui/components/Button'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  role: yup.string().required(),
})

export function MyForm() {
  const handleSubmit = (data: any) => console.log(data)

  return (
    <Form onSubmit={handleSubmit} validationSchema={schema}>
      <FormTextInput name="email" label="Email" />
      <FormSelectBox
        name="role"
        label="Role"
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
        ]}
      />
      <Button type="submit" label="Submit" />
    </Form>
  )
}
```

## Authors

- **Utku Sezici** — [@utkusezici](https://github.com/utkusezici)
- **Berke Özenses** — [@berkeozenses](https://github.com/berkeozenses)

## License

MIT
