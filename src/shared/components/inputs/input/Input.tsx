import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';

import { BoxInput, TitleInput } from './input.style';

export interface InputProps extends InputPropsAntd {
  title?: string;
  margin?: string;
  type?: string;
}

const Input = ({ title, margin, type, ...props }: InputProps) => {
  const isPasswordInput = type === 'password';

  return (
    <BoxInput style={{ margin: margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      {isPasswordInput ? <InputAntd.Password {...props} /> : <InputAntd {...props} />}
    </BoxInput>
  );
};

export default Input;
