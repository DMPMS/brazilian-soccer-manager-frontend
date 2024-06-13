import { InputNumberProps } from 'antd';

import { InputNumberStyled } from './inputIntegerProject.style';

interface InputIntegerProjectProps extends InputNumberProps {}

const NUMERIC_CHAR_CODE_START = 48;
const NUMERIC_CHAR_CODE_END = 57;

const InputIntegerProject = ({ ...props }: InputIntegerProjectProps) => {
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > NUMERIC_CHAR_CODE_END || charCode < NUMERIC_CHAR_CODE_START) {
      e.preventDefault();
    }
  };

  const handleOnChange = (value: number | string | undefined | null) => {
    // Remove non-numeric characters from value.
    if (value !== null && value !== undefined && value !== '' && !Number.isInteger(Number(value))) {
      return value.toString().slice(0, -1);
    }
    return value;
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData('text');
    // Checks if the pasted text contains only numbers.
    if (!/^\d+$/.test(pastedData)) {
      e.preventDefault();
    }
  };

  return (
    <InputNumberStyled
      onKeyPress={handleOnKeyPress}
      onChange={handleOnChange}
      onPaste={handleOnPaste}
      {...props}
    />
  );
};

export default InputIntegerProject;
