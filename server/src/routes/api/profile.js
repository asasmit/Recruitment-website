import { Router } from 'express';
const router = Router();
import authorization from '../../middlewares/authorization.js';

import Admin from '../../models/Admin.js';
import Company from '../../models/Company.js';
import Student from '../../models/Student.js';

import { ADMIN, COMPANY, STUDENT } from '../../constants/roles.js';

import validateUpdateRequest from '../../validation/validateProfile.js';

router.get('/', authorization, (req, res) => {
  const { _id,role } = req.user;

  if (role === ADMIN)
    return Admin.findById(_id)
      .then(data => {
        const user = data.toObject();
        delete user.password;

        res.status(200).send(user);
      })
      .catch(error => res.status(400).send({ message: error.message }));

  if (role === COMPANY)
    return Company.findById(_id)
      .then(data => {
        const user = data.toObject();
        delete user.password;

        res.status(200).send(user);
      })
      .catch(error => res.status(400).send({ message: error.message }));

  if (role === STUDENT)
    return Student.findById(_id)
      .then(data => {
        const user = data.toObject();
        delete user.password;

        res.status(200).send(user);
      })
      .catch(error => res.status(400).send({ message: error.message }));
});

router.get('/:id', authorization, (req, res) => {
  Student.findById(req.params.id)
    .then(data => {
      const user = data.toObject();
      delete user.password;

      res.status(200).send(user);
    })
    .catch(error => res.status(400).send({ message: error.message }));
});

router.patch('/', authorization, (req, res) => {
  const { _id, role } = req.user;
  const {
    firstName,
    lastName,
    companyName,
    companyEmail,
    companyPhone,
    phone,
  } = req.body;

  try {
    validateUpdateRequest(role, req.body);

    // Perform the database update based on role
    if (role === ADMIN) {
      return Admin.updateOne({ _id }, { $set: { firstName, lastName } })
      .then(success => res.status(200).send(success.nModified))
      .catch(error => res.status(400).send({ message: error.message }));
    }

    if (role === COMPANY) {
      return Company.updateOne(
        { _id },
        { $set: { firstName, lastName, companyName, companyEmail, companyPhone } }
      )
        .then(success => res.status(200).send(success.nModified))
        .catch(error => res.status(400).send({ message: error.message }));
    }

    if (role === STUDENT) {
      return Student.updateOne({ _id }, { $set: { firstName, lastName, phone } })
        .then(success => res.status(200).send(success.nModified))
        .catch(error => res.status(400).send({ message: error.message }));
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default router;
