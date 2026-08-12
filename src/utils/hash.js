import bcrypt from 'bcrypt';

// Función para encriptar la contraseña (usada en Registro)
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Función para comparar la contraseña ingresada con la de la BD (usada en Login)
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};