import { Router } from 'express';
const router = Router();
import pkg from 'bcryptjs';
const { genSaltSync, hashSync, compareSync } = pkg;
import pkg2 from 'jsonwebtoken';
const { sign } = pkg2;

import Admin from '../../models/Admin.js';
import Company from '../../models/Company.js';
import Student from '../../models/Student.js';

import { ADMIN, COMPANY, STUDENT } from '../../constants/roles.js';
import validateSignUp from '../../validation/validateSignUp.js';
import validateLogIn from '../../validation/validateLogIn.js';

router.post('/signup/:role', async (req, res) => {
  const { role } = req.params;
  const { firstName, lastName, email, password } = req.body;

  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send({ message: error.message });

  const isEmailExistInAdmins = await Admin.findOne({ email });
  const isEmailExistInCompanies = await Company.findOne({ email });
  const isEmailExistInStudents = await Student.findOne({ email });

  if (isEmailExistInAdmins || isEmailExistInCompanies || isEmailExistInStudents)
    return res.status(400).send({
      message: 'The email address is already in use by another account.',
    });

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  if (role === COMPANY) {
    const company = new Company({
      firstName,
      lastName,
      email,
      password: hash,
    });

    const token = sign({ _id: company._id, role }, 'asmittt');

    company
      .save()
      .then(data => {
        const user = data.toObject();
        delete user.password;

        res.status(201).send({ user, token });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  } else if (role === STUDENT) {
    const student = new Student({
      firstName,
      lastName,
      email: email,
      password: hash,
    });

    const token = sign({ _id: student._id, role }, 'asmittt');

    student
      .save()
      .then(data => {
        const user = data.toObject();
        delete user.password;

        res.status(201).send({ user, token });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  }
});

router.post('/login/:role', async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;

  const { error } = validateLogIn(req.body);
  if (error) return res.status(400).send({ message: error.message });

  if (role === ADMIN) {
    const user = await Admin.findOne({ email });

    if (!user)
      return res.status(400).send({
        message: 'There is no user record corresponding to this identifier.',
      });

    const checkPassword = compareSync(password, user.password);
    if (!checkPassword)
      return res.status(400).send({ message: 'The password is invalid.' });

    const token = sign({ _id: user._id, role }, 'asmittt');

    const userData = user.toObject();
    delete userData.password;

    res.status(200).send({ user: userData, token });
  } else if (role === COMPANY) {
    const user = await Company.findOne({ email });

    if (!user)
      return res.status(400).send({
        message: 'There is no user record corresponding to this identifier.',
      });

    const checkPassword = compareSync(password, user.password);
    if (!checkPassword)
      return res.status(400).send({ message: 'The password is invalid.' });

    const token = sign({ _id: user._id, role }, 'asmittt');

    const userData = user.toObject();
    delete userData.password;

    res.status(200).send({ user: userData, token });
  } else if (role === STUDENT) {
    const user = await Student.findOne({ email });

    if (!user)
      return res.status(400).send({
        message: 'There is no user record corresponding to this identifier.',
      });

    const checkPassword = compareSync(password, user.password);
    if (!checkPassword)
      return res.status(400).send({ message: 'The password is invalid.' });

    const token = sign({ _id: user._id, role }, 'asmittt');

    const userData = user.toObject();
    delete userData.password;

    res.status(200).send({ user: userData, token });
  }
});

export default router;
