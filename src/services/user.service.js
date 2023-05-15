import { NOW } from 'sequelize';
import sequelize, { DataTypes, QueryTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  const data1 = User.sequelize.query("SELECT * FROM public.users", { type: QueryTypes.SELECT })
  return data1;
};

//create new user
export const newUser = async (body) => {
  // const data = await User.create(body);
  // let sqlq = "INSERT INTO public.users(firstName,lastName,email) VALUES(@0,@1,@2)";
  const data1 = await User.sequelize.query(`INSERT INTO public.users("firstName","lastName","email","createdAt","updatedAt") VALUES(:firstName,:lastName,:email,:createdAt,:updatedAt)`, {
    replacements: {
      firstName: body.firstName, lastName: body.lastName,
      email: body.email, createdAt: `2023-05-15 12:10:30.445+05:30`,
      updatedAt: '2023-05-15 12:10:30.445+05:30'
    },
    type: QueryTypes.SELECT
  });
  return data1;
};

//update single user
export const updateUser = async (id, body) => {
  // await User.update(body, {
  //   where: { id: id }
  // });
  await sequelize.query(
    `UPDATE users SET "firstName" = :firstName WHERE id = :id`,
    {
      replacements: {
        id: id, firstName: body.firstName
      },
      type: QueryTypes.SELECT
    }
  );
  return body;
};

//delete single user
export const deleteUser = async (id) => {
  // await User.destroy({ where: { id: id } });
  await User.sequelize.query(`DELETE FROM public.users WHERE id = :id`,
    {
      replacements: { id: id },
      type: QueryTypes.SELECT
    })
  return '';
};

//get single user
export const getUser = async (id) => {
  // const data = await User.findByPk(id);
  const data1 = await User.sequelize.query(`SELECT * FROM public.users WHERE id = :id`, {
    replacements: { id: id },
    type: QueryTypes.SELECT
  })
  return data1;
};
