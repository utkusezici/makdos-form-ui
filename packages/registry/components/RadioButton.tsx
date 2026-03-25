
type Props = {
    items: { id: string; text: string }[];
    name: string;
    onChange: (value: string) => void;
    selected: string;
    style?: string;
}

function RadioButton({ items, name, selected, onChange, style }: Props) {
    return (
        <div className={`flex items-center space-x-6${style ? ` ${style}` : ""}`}>

            {items.map((item, i) => {
                return (
                    <div key={i} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={item.id}
                            name={name}
                            checked={item.id === selected}
                            value={selected}
                            className="accent-toggle-checked cursor-pointer"
                            onChange={() => onChange(item.id)}
                        />
                        <span className="text-text cursor-pointer" onClick={() => onChange(item.id)}>{item.text}</span>
                    </div>
                )
            })

            }

        </div>
    )
}

export default RadioButton
