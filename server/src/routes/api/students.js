import { Router } from 'express';
const router = Router();
import authorization from '../../middlewares/authorization.js';

import Student from '../../models/Student.js';

import { ADMIN, STUDENT } from '../../constants/roles.js';

router.get('/', authorization, (req, res) => {
  if (req.user.role === STUDENT)
    return res.status(403).send({ message: 'Access denied.' });

  Student.find({})
    .then(students => res.status(200).send(students))
    .catch(error => res.status(400).send({ message: error.message }));
});

router.get('/:id', authorization, (req, res) => {
  if (req.user.role === STUDENT)
    return res.status(401).send({ message: 'Access denied.' });

  Student.findById(req.params.id)
    .then(student => res.status(200).send(student))
    .catch(error => res.status(400).send({ message: error.message }));
});

router.delete('/:id', authorization, (req, res) => {
  if (req.user.role !== ADMIN)
    return res.status(401).send({ message: 'Access denied.' });

  Student.deleteOne({ _id: req.params.id })
    .then(success => res.status(200).send(success.deletedCount.toString()))
    .catch(error => res.status(400).send({ message: error.message }));
});

export default router;
