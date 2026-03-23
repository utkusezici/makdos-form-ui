
type Props = {
    items: { id: string, text: string }[],
    name: string
    onChange: React.Dispatch<React.SetStateAction<any>>
    selected: string
    style?: string
}

function RadioButton({ items, name, selected, onChange, style }: Props) {
    return (
        <div className={`flex items-center space-x-6 ${style}`}>

            {items.map((item, i) => {
                return (
                    <div key={i} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={item.id}
                            name={name}
                            checked={item.id === selected}
                            value={selected}
                            className="accent-togglecheckedcolor cursor-pointer"
                            onChange={() => onChange(item.id)}
                        />
                        <span className="text-textcolor dark:text-darktextcolor cursor-pointer" onClick={() => onChange(item.id)}>{item.text}</span>
                    </div>
                )
            })

            }

        </div>
    )
}

export default RadioButton