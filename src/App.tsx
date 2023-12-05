import React from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import {useFormik} from 'formik';

/**
 * Valores iniciais do formulário
 */
const formInitialValues = {
  name: '',
  address: '',
  phone: '',
  email: '',
  birthDate: '',
}

/**
 * Schema de validação do formulário
 */
const formValidationSchema = yup.object().shape({
  /**No .matches verifica se o nome contém números */
  name: yup.string().matches(/^([^0-9]*)$/, 'Nome não pode conter números').required('Nome obrigatório'),
  address: yup.string().required('Endereço obrigatório'),
  phone: yup.number().required('Telefone obrigatório'),
  email: yup.string().email().required('Email obrigatório'),
  birthDate: yup.date().required('Data de Nascimento obrigatório')
});

interface FormFieldProps {
  name: string;
  value: string;
  label: string;
  type?: string;
  errorMessage?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Abstração do input do MUI para reduzir algumas props
 */
const FormField = ({
  name,
  type = 'text',
  placeholder,
  label,
  value,
  onBlur, 
  onChange,
  errorMessage = ''
}: FormFieldProps) => {
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={!!errorMessage}
      helperText={errorMessage}
      InputLabelProps={{
        shrink: true /**Prop para manter o label acima do input */
      }}
    />
  );
}

export default function App() {

  /**
   * Função para submeter o formulário
   */
  const onSubmitForm = (values: typeof formInitialValues) => {
    /**
     * Insira o código de para submeter o formulário abaixo
     * Descomente o código abaixo para imprimir os valores no console
     */
    //console.log(values);
  }

  const form = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmitForm
  });

  /**
   * Função para validar o onChange do telefone
   */
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * Caso o valor contenha alguma letra, ele não atualiza o input do telefone
     */
    if(e.target.value?.match(/[a-zA-Z]/gi)) {
      return;
    }
    
    return form.handleChange(e);
  }
  

  return (
    <Box sx={{display: 'flex'}}>
      <Box
        onSubmit={form.handleSubmit}
        component="form"
        sx={{
          m: '0 auto',
          p: '1rem',
          minWidth: '350px',
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll'
        }}
      >
        <Typography variant="h4" sx={{color: '#000', m: '0 auto 1rem auto'}}>Formulário</Typography>
        <FormField
          name="name"
          label="Nome"
          placeholder="Nome"
          type="text"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.name}
          errorMessage={form.errors.name}
        />
        <FormField
          name="address"
          label="Endereço"
          placeholder="Endereço"
          type="text"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.address}
          errorMessage={form.errors.address}
        />
        <FormField
          name="phone"
          label="Telefone"
          placeholder="99999999999"
          type="tel"
          onChange={onChangePhone}
          onBlur={form.handleBlur}
          value={form.values.phone}
          errorMessage={form.errors.phone}
        />
        <FormField
          name="email"
          label="E-mail"
          placeholder="example@example.com"
          type="email"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
          errorMessage={form.errors.email}
        />
        <FormField
          name="birthDate"
          label="Data de Nascimento"
          type="date"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.birthDate}
          errorMessage={form.errors.birthDate}
        />
        <Button variant="contained" type="submit">Enviar</Button>
      </Box>
    </Box>
  );
}