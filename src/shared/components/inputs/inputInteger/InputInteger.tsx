import { useState } from 'react';

import Input, { InputProps } from '../input/Input';

interface InputIntegerProps extends InputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputInteger = ({ value, onChange, ...props }: InputIntegerProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    let newValue;
    if (inputValue === '') {
      newValue = '0';
    } else {
      newValue = inputValue.replace(/\D/, '');
      if (!/\D/.test(inputValue)) {
        newValue = inputValue.replace(/^0+(?!$)/, '').replace(/\D/, '');
      }
    }

    setCurrentValue(newValue);

    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return <Input value={currentValue} onChange={handleOnChange} {...props} />;
};

export default InputInteger;
