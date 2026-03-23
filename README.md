# Makdos Form UI

A CLI-first React form component library built on React Hook Form + Tailwind CSS. Add components directly to your project — own the code, customize freely.

## Usage

```bash
# Add a component
npx @makdosdev/form-ui add FormTextInput

# Add multiple components
npx @makdosdev/form-ui add FormTextInput FormSelectBox FormCheckBox

# List all available components
npx @makdosdev/form-ui list
```

Components are copied directly into your project under `src/components/ui/` by default. You can change the destination:

```bash
npx @makdosdev/form-ui add FormTextInput --path src/components/forms
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

## Examples

### FormTextInput

```tsx
<FormTextInput
  name="username"
  label="Username"
  placeholder="Enter your username"
  leftIcon={<IconMail />}
  rules={{ required: { value: true, message: 'This field is required.' } }}
/>

<FormTextInput
  name="password"
  label="Password"
  placeholder="••••••••••"
  type="password"
  leftIcon={<IconLock />}
  rules={{ required: { value: true, message: 'This field is required.' } }}
/>
```

### FormTextArea

```tsx
<FormTextArea
  name="note"
  label="Note"
  placeholder="Write something..."
  rows={4}
/>
```

### FormSelectBox

```tsx
<FormSelectBox
  name="role"
  label="Role"
  placeholder="Select a role"
  items={[
    { value: 1, text: 'Admin' },
    { value: 2, text: 'Editor' },
    { value: 3, text: 'Viewer' },
  ]}
  search
  required
  rules={{ required: { value: true, message: 'This field is required.' } }}
/>
```

### FormCheckBox

```tsx
<FormCheckBox
  name="acceptTerms"
  label="I accept the terms"
  labelRight
  onChange={(checked) => console.log(checked)}
/>
```

### FormToggle

```tsx
<FormToggle
  id="is_active"
  name="is_active"
  label="Active"
  labelRight
  style="mb-2"
/>
```

### FormNumeric

```tsx
<FormNumeric
  name="balance"
  label="Balance"
  placeholder="Enter balance"
  required
  rules={{
    required: { value: true, message: 'This field is required.' },
    min: { value: 0.01, message: 'Balance must be greater than 0.' },
  }}
/>
```

### FormDateTime

```tsx
<FormDateTime
  name="start_date"
  label="Start Date"
  required
  rules={{ required: { value: true, message: 'Start date is required.' } }}
  style="col-span-2 lg:col-span-1"
/>
```

### FormTime

```tsx
<FormTime
  name="meeting_time"
  label="Meeting Time"
  rules={{ required: { value: true, message: 'This field is required.' } }}
/>
```

### FormPhoneInput

```tsx
<FormPhoneInput
  id="phone"
  name="phone"
  label="Phone"
  placeholder="Phone number"
  rules={{
    required: { value: true, message: 'This field is required.' },
    minLength: { value: 12, message: 'Please enter a valid phone number.' },
  }}
/>
```

### Button

```tsx
<Button text="Save" size="medium" />

<Button
  text="Download PDF"
  buttonType="bordered"
  iconLeft={<IconDownload />}
  type="button"
  onClick={handleDownload}
/>

<Button
  text="Submit"
  buttonType="primary"
  iconLeft={<IconCircleCheck />}
  type="submit"
/>
```

### RadioButton

```tsx
const [selected, setSelected] = useState('income')

<RadioButton
  name="transaction_type"
  items={[
    { id: 'income', text: 'Income' },
    { id: 'expense', text: 'Expense' },
  ]}
  selected={selected}
  onChange={(value) => setSelected(value)}
/>
```

### TextEditor

```tsx
const [editorData, setEditorData] = useState()

<TextEditor
  editorData={editorData}
  onEditorChange={(state) => setEditorData(state)}
/>
```

### Paginate

```tsx
<Paginate
  pageTotal={numberOfPages}
  pageLimit={pageLimit}
  onPageLimitChange={setPageLimit}
/>
```

### ListBox

```tsx
const [items, setItems] = useState([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
])
const [selected, setSelected] = useState([])

<ListBox
  type="double"
  label="Available"
  labelType="Selected"
  items={items}
  setItems={setItems}
  selectedItems={selected}
  setSelectedItems={setSelected}
  height="h-[300px]"
  width="w-[400px]"
/>
```

### SelectBoxGroup

```tsx
<SelectBoxGroup
  name="category"
  label="Category"
  type="checkbox"
  items={groupedItems}
  selectedItems={selected}
  setSelectedItems={setSelected}
  search
  placeholder="Select..."
/>
```

### FileUploader

```tsx
const [files, setFiles] = useState([])

<FileUploader
  value={files}
  setValue={setFiles}
  onChange={setFiles}
  formats={['pdf', 'jpg', 'jpeg', 'png']}
  onlyFile
  multiple={1}
  label="Upload File"
/>
```

### Full Form Example

```tsx
import Form, { SubmitFunction } from '@/components/ui/Form'
import FormTextInput from '@/components/ui/FormTextInput'
import FormSelectBox from '@/components/ui/FormSelectBox'
import FormPhoneInput from '@/components/ui/FormPhoneInput'
import FormTextArea from '@/components/ui/FormTextArea'
import Button from '@/components/ui/components/Button'
import { IconMail } from '@tabler/icons-react'

function ContactForm() {
  const handleSubmit: SubmitFunction = async (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTextInput
        name="email"
        label="Email"
        placeholder="email@example.com"
        leftIcon={<IconMail />}
        rules={{ required: { value: true, message: 'This field is required.' } }}
      />
      <FormPhoneInput
        id="phone"
        name="phone"
        label="Phone"
        placeholder="Phone number"
        rules={{ required: { value: true, message: 'This field is required.' } }}
      />
      <FormSelectBox
        name="subject"
        label="Subject"
        placeholder="Select subject"
        items={[
          { value: 1, text: 'Support' },
          { value: 2, text: 'Sales' },
          { value: 3, text: 'Other' },
        ]}
        rules={{ required: { value: true, message: 'This field is required.' } }}
      />
      <FormTextArea
        name="message"
        label="Message"
        placeholder="Your message..."
        rows={5}
      />
      <Button text="Send" buttonType="primary" type="submit" />
    </Form>
  )
}
```

## Authors

- **Utku Sezici** — [@utkusezici](https://github.com/utkusezici)
- **Berke Özenses** — [@berkeozenses](https://github.com/berkeozenses)

## License

MIT
