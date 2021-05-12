import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ label, size: _, textarea, ...props }) => {
  let InputComponent: any = Input;
  if (textarea) InputComponent = Textarea;
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputComponent {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
