# Makdos Form UI

A CLI-first React form component library built on React Hook Form + Tailwind CSS. Add components directly to your project — own the code, customize freely.

Built by [Makdos](https://makdos.com/en/) — software products crafted for modern teams.

![Form Components Preview](./FormScreenshot.png)

## Getting Started

### 1. Initialize

Run the init command in your project root. This sets up Tailwind CSS (if not already installed), creates `makdos-theme.css`, and generates `makdos.config.json`.

```bash
npx @makdosdev/form-ui init
```

What it does automatically:
- **Next.js** — installs `tailwindcss @tailwindcss/postcss postcss` and creates `postcss.config.mjs`
- **Vite** — installs `tailwindcss @tailwindcss/vite` and shows the config step
- Both — creates `makdos-theme.css` and `makdos.config.json` in your project root

### 2. Import the theme in your global CSS

**Next.js** (`app/globals.css`):
```css
@import "tailwindcss";
@import "./makdos-theme.css";
```

**Vite** (`src/index.css`):
```css
@import "tailwindcss";
@import "./makdos-theme.css";
```

### 3. Vite only — add the plugin to vite.config.ts

```ts
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

> Next.js users can skip this step — `postcss.config.mjs` was created automatically.

### 4. Add components

```bash
npx @makdosdev/form-ui add FormTextInput
npx @makdosdev/form-ui add FormTextInput FormSelectBox FormCheckBox
```

Components are copied into `src/components/FormElements/` by default. Change the destination in `makdos.config.json`:

```json
{
  "path": "src/components/FormElements"
}
```

Or override it once with the `--path` flag:

```bash
npx @makdosdev/form-ui add FormTextInput --path src/components/forms
```

### Other commands

```bash
npx @makdosdev/form-ui list   # List all available components
```

## Available Components

### Form Components
Use these inside a `<Form>` wrapper. They integrate with React Hook Form automatically — validation, error display, and submit handling included.

| Component | Standalone Base | Description |
|-----------|----------------|-------------|
| `FormTextInput` | `TextInput` | Text, password, search, domain input |
| `FormSelectBox` | `SelectBox` | Single & multi-select dropdown |
| `FormCheckBox` | `CheckBox` | Checkbox |
| `FormTextArea` | `TextArea` | Textarea |
| `FormToggle` | `Toggle` | Toggle / switch |
| `FormNumeric` | `Numeric` | Number input with min/max |
| `FormDateTime` | `DateTime` | Date & datetime picker |
| `FormTime` | `Time` | Time picker |
| `FormPhoneInput` | `PhoneInput` | Phone input with country code |

### Standalone Components
Use these directly with `useState` — no form required. Great for filters, search bars, and UI-only interactions.

| Component | Description |
|-----------|-------------|
| `TextInput` | Text input with icon support |
| `SelectBox` | Dropdown with search & multi-select |
| `CheckBox` | Checkbox |
| `TextArea` | Textarea |
| `Toggle` | Toggle / switch |
| `Numeric` | Number input |
| `DateTime` | Date picker |
| `DatePicketBig` | Full calendar date picker |
| `Time` | Time picker |
| `PhoneInput` | Phone input with country code |
| `RadioButton` | Radio button group |
| `SelectBoxGroup` | Grouped dropdown with search |
| `ListBox` | Dual-list selection (available / selected) |
| `Button` | Button with 5 variants (primary, secondary, tertiary, bordered, error) |
| `TextEditor` | Rich text editor |

### Hooks

| Hook | Description |
|------|-------------|
| `useSelectbox` | Converts API data to SelectBox format |
| `useMultipleSelectbox` | Same as above with checked state for multi-select |
| `useSelectboxGroup` | Groups items by a field for SelectBoxGroup |
| `useOutSideClick` | Detects clicks outside an element |
| `useWindowSize` | Returns current window width & height |

---

## Theming

All components are styled using CSS custom properties. This means you can change every color — inputs, buttons, toggles, focus states — by editing a single file.

### Setup

`makdos-theme.css` is created automatically when you run `init` or add your first component. Import it in your global CSS file:

```css
@import "tailwindcss";
@import "./makdos-theme.css";
```

### Customizing Colors

Open `makdos-theme.css` and change any variable:

```css
@theme {
  /* Change the primary color across all components */
  --color-focus-border:        #e74c3c;
  --color-toggle-checked:      #e74c3c;
  --color-primary-button-bg:   #e74c3c;
}
```

### Color Variables Reference

| Variable | Default | Used In |
|----------|---------|---------|
| `--color-label` | `#5D646B` | All input labels |
| `--color-text` | `#5D646B` | Input text, dropdown text |
| `--color-placeholder` | `#ADB5BD` | Input placeholders |
| `--color-border` | `#DEE2E6` | Input borders |
| `--color-background-form` | `#FFFFFF` | Input background |
| `--color-error` | `#FC2B36` | Error messages, error borders |
| `--color-icon` | `#ADB5BD` | Input icons (default state) |
| `--color-focus-border` | `#1958F9` | Input border on focus |
| `--color-focus-placeholder` | `#5D646B` | Input placeholder on focus |
| `--color-focus-icon` | `#5D646B` | Input icon on focus |
| `--color-disable-text` | `#CAD0DC` | Disabled input text |
| `--color-disable-background` | `#DEE2E6` | Disabled input background |
| `--color-toggle-checked` | `#1958F9` | Toggle ON state |
| `--color-toggle-unchecked` | `#DEE2E6` | Toggle OFF state |
| `--color-selectbox-hover-item` | `#DEE2E6` | Dropdown item hover |
| `--color-primary-button-bg` | `#1958F9` | Primary button background |
| `--color-primary-button-text` | `#FFFFFF` | Primary button text |
| `--color-primary-button-hover-bg` | `#0F599A` | Primary button hover |
| `--color-secondary-button-bg` | `#E8EFFF` | Secondary button background |
| `--color-tertiary-button-bg` | `#FFFFFF` | Tertiary button background |
| `--color-bordered-button-border` | `#1958F9` | Bordered button border |
| `--color-error-button-bg` | `#FF4D56` | Error button background |

### Example: Red Theme

```css
@theme {
  --color-focus-border:              #e74c3c;
  --color-toggle-checked:            #e74c3c;
  --color-primary-button-bg:         #e74c3c;
  --color-primary-button-hover-bg:   #c0392b;
  --color-secondary-button-text:     #e74c3c;
  --color-bordered-button-text:      #e74c3c;
  --color-bordered-button-border:    #e74c3c;
  --color-bordered-button-hover-bg:  #c0392b;
}
```

---

## Two Ways to Use

Every component can be used in two ways:

- **With `<Form>`** — integrated with React Hook Form, validation, submit handling
- **Standalone** — directly with `useState`, no form needed (useful for filters, search bars, etc.)

---

## TextInput

**With Form:**
```tsx
import FormTextInput from '@/components/ui/FormTextInput'
import { IconMail, IconLock } from '@tabler/icons-react'

<FormTextInput
  name="email"
  label="Email"
  placeholder="email@example.com"
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

**Standalone (search / filter):**
```tsx
import TextInput from '@/components/ui/components/TextInput'

const [search, setSearch] = useState('')

<TextInput
  name="search"
  value={search}
  onChange={setSearch}
  placeholder="Search..."
  type="search"
/>
```

---

## TextArea

**With Form:**
```tsx
import FormTextArea from '@/components/ui/FormTextArea'

<FormTextArea
  name="note"
  label="Note"
  placeholder="Write something..."
  rows={4}
/>
```

---

## SelectBox

**With Form:**
```tsx
import FormSelectBox from '@/components/ui/FormSelectBox'

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

**Standalone (filter bar) — with `useSelectbox` hook:**
```tsx
import SelectBox from '@/components/ui/components/SelectBox'
import { useSelectbox } from '@/components/ui/hooks'

const [companyList, setCompanyList] = useSelectbox()
const [selectedCompany, setSelectedCompany] = useState(null)

// Convert API data
useEffect(() => {
  fetchCompanies().then((res) => setCompanyList(res, 'id', 'name'))
}, [])

<SelectBox
  items={companyList}
  setItems={setCompanyList}
  selectedItems={selectedCompany}
  setSelectedItems={setSelectedCompany}
  formClickTriggerFunction={(item) => onFilter({ company_id: item?.value })}
  style="w-[200px]"
/>
```

---

## CheckBox

**With Form:**
```tsx
import FormCheckBox from '@/components/ui/FormCheckBox'

<FormCheckBox
  name="acceptTerms"
  label="I accept the terms"
  labelRight
  onChange={(checked) => console.log(checked)}
/>
```

---

## Toggle

**With Form:**
```tsx
import FormToggle from '@/components/ui/FormToogle'

<FormToggle
  id="is_active"
  name="is_active"
  label="Active"
  labelRight
  style="mb-2"
/>
```

**Standalone:**
```tsx
import FormToggle from '@/components/ui/FormToogle'

const [isDeposit, setIsDeposit] = useState(false)

<FormToggle
  id="is_deposit"
  name="is_deposit"
  label="Deposit"
  labelRight
  isCheck={isDeposit}
  setIsCheck={setIsDeposit}
  style="mb-2"
/>
```

---

## Numeric

**With Form:**
```tsx
import FormNumeric from '@/components/ui/FormNumeric'

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

---

## DateTime

**With Form:**
```tsx
import FormDateTime from '@/components/ui/FormDateTime'

<FormDateTime
  name="start_date"
  label="Start Date"
  required
  rules={{ required: { value: true, message: 'Start date is required.' } }}
  style="col-span-2 lg:col-span-1"
/>
```

**Standalone (date filter):**
```tsx
import DatePicketBig from '@/components/ui/components/DatePicketBig'

const [date, setDate] = useState(null)

<DatePicketBig
  placeholder="Select Date"
  value={date}
  onChange={setDate}
  onChangeDateTime={(val) => onFilter({ date: val })}
/>
```

---

## Time

**With Form:**
```tsx
import FormTime from '@/components/ui/FormTime'

<FormTime
  name="meeting_time"
  label="Meeting Time"
  rules={{ required: { value: true, message: 'This field is required.' } }}
/>
```

---

## PhoneInput

**With Form:**
```tsx
import FormPhoneInput from '@/components/ui/FormPhoneInput'

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

---

## Button

```tsx
import Button from '@/components/ui/components/Button'
import { IconDownload, IconCircleCheck } from '@tabler/icons-react'

// Default submit button
<Button text="Save" size="medium" />

// Bordered with icon
<Button
  text="Download PDF"
  buttonType="bordered"
  iconLeft={<IconDownload />}
  type="button"
  onClick={handleDownload}
/>

// Primary submit
<Button
  text="Submit"
  buttonType="primary"
  iconLeft={<IconCircleCheck />}
  type="submit"
/>
```

---

## RadioButton

```tsx
import RadioButton from '@/components/ui/components/RadioButton'

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

---

## TextEditor

```tsx
import TextEditor from '@/components/ui/components/TextEditor'

const [editorData, setEditorData] = useState()

<TextEditor
  editorData={editorData}
  onEditorChange={(state) => setEditorData(state)}
/>
```

---

## ListBox

```tsx
import ListBox from '@/components/ui/components/ListBox'

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

---

## SelectBoxGroup

```tsx
import SelectBoxGroup from '@/components/ui/components/SelectBoxGroup'
import { useSelectboxGroup } from '@/components/ui/hooks'

const [groupItems, setGroupItems] = useSelectboxGroup()
const [selected, setSelected] = useState([])

useEffect(() => {
  fetchCategories().then((res) => setGroupItems(res, 'id', 'name', 'group'))
}, [])

<SelectBoxGroup
  name="category"
  label="Category"
  type="checkbox"
  items={groupItems}
  selectedItems={selected}
  setSelectedItems={setSelected}
  search
  placeholder="Select..."
/>
```

---

## Hooks

```tsx
import {
  useSelectbox,
  useMultipleSelectbox,
  useSelectboxGroup,
  useOutSideClick,
  useWindowSize
} from '@/components/ui/hooks'

// Single select — converts API data to SelectBox format
const [items, setItems] = useSelectbox()
setItems(apiData, 'id', 'name')
// output: [{ value: id, text: name, otherInfo: { ...all fields } }]

// Multi select — with checked state
const [items, setItems] = useMultipleSelectbox()
setItems(apiData, 'id', 'name', 'is_selected')

// Grouped select — for SelectBoxGroup
const [groupItems, setGroupItems] = useSelectboxGroup()
setGroupItems(apiData, 'id', 'name', 'group_name')

// Outside click detection (for dropdowns/modals)
const [wrapperRef] = useOutSideClick(() => setIsOpen(false))
<div ref={wrapperRef}>...</div>

// Window size
const { width, height } = useWindowSize()
```

---

## Full Form Example

```tsx
import Form, { SubmitFunction } from '@/components/ui/Form'
import FormTextInput from '@/components/ui/FormTextInput'
import FormSelectBox from '@/components/ui/FormSelectBox'
import FormNumeric from '@/components/ui/FormNumeric'
import FormPhoneInput from '@/components/ui/FormPhoneInput'
import FormTextArea from '@/components/ui/FormTextArea'
import Button from '@/components/ui/components/Button'
import { useSelectbox } from '@/components/ui/hooks'
import { IconMail } from '@tabler/icons-react'

function ContactForm() {
  const [subjectList, setSubjectList] = useSelectbox()

  useEffect(() => {
    fetchSubjects().then((res) => setSubjectList(res, 'id', 'name'))
  }, [])

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
        items={subjectList}
        rules={{ required: { value: true, message: 'This field is required.' } }}
      />
      <FormNumeric
        name="amount"
        label="Amount"
        placeholder="Enter amount"
        rules={{
          required: { value: true, message: 'This field is required.' },
          min: { value: 1, message: 'Must be greater than 0.' },
        }}
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

---

## Authors

- **Utku Sezici** — [@utkusezici](https://github.com/utkusezici)
- **Berke Özenses** — [@berkeozenses](https://github.com/berkeozenses)

Made at [Makdos](https://makdos.com/en/)

## License

MIT
