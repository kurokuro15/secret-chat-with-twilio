import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Este campo no es válido',
    required: 'Este campo es requerido'
  },
  string: {
    length: 'Debe tener ${length} caracteres',
    min: 'Debe tener ${min} o más caracteres',
    max: 'Debe tener ${max} o menos caracteres',
    email: 'Debe ser un correo electrónico válido'
  },
  number: {
    min: 'Debe ser mayor o igual a ${min}',
    max: 'Debe ser menor o igual a ${max}',
    integer: 'Debe ser entero',
    positive: 'Debe ser positivo'
  },
  date: {
    min: 'Debe ser mayor o igual a ${min}',
    max: 'Debe ser menor o igual a ${max}'
  }
});
