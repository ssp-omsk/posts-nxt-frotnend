import { Listbox } from "@headlessui/react";
import { FC, PropsWithChildren, useState } from "react";

interface SelectProps {
  label?: string;
  items: any[];
  onChange: (val: any) => void;
}

export const Select: FC<PropsWithChildren<SelectProps>> = ({
  label,
  items,
  onChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const onChangeHandler = (val: any[]) => {
    setSelectedItems(val);
    onChange(val);
  };

  return (
    <Listbox value={selectedItems} onChange={onChangeHandler} multiple>
        <Listbox.Label>{label}</Listbox.Label>
      <Listbox.Button className='select w-full max-w-xs'>
        {selectedItems.map((item) => item.name).join(", ")}
      </Listbox.Button>
      <Listbox.Options className="flex flex-col border-2 border-primary rounded-lg">
        {items.map((item) => (
          <Listbox.Option key={item.id} value={item} className='ui-active:bg-primary py-1 px-2 ui-selected:text-gray-500'>
            {item.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
