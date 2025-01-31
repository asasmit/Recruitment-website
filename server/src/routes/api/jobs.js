import { Router } from 'express';
const router = Router();
import authorization from '../../middlewares/authorization.js';

import Job from '../../models/Job.js';

import { COMPANY, STUDENT } from '../../constants/roles.js';

router.get('/', authorization, (req, res) => {
  const { _id, role } = req.user;

  if (role === COMPANY)
    return Job.find({ _companyId: _id })
      .then(jobs => res.status(200).send(jobs))
      .catch(error => res.status(400).send({ message: error.message }));

  Job.find({})
    .then(jobs => res.status(200).send(jobs))
    .catch(error => res.status(400).send({ message: error.message }));
});

router.post('/', authorization, (req, res) => {
  const { _id, role } = req.user;
  const { title, description } = req.body;

  if (role !== COMPANY)
    return res.status(401).send({ message: 'Access denied.' });

  const job = new Job({
    _companyId: _id,
    title,
    description,
  });

  job
    .save()
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send({ message: error.message }));
});

router.get('/:id', authorization, (req, res) => {
  const { _id, role } = req.user;

  if (role === COMPANY)
    return Job.find({ _id: req.params.id, _companyId: _id })
      .then(job => res.status(200).send(job))
      .catch(error => res.status(400).send({ message: error.message }));

  Job.findById(req.params.id)
    .then(job => res.status(200).send(job))
    .catch(error => res.status(400).send({ message: error.message }));
});

router.patch('/:id/apply', authorization, (req, res) => {
  const { _id, role } = req.user;

  if (role !== STUDENT) {
    return res.status(401).send({ message: 'Access denied.' });
  }

  Job.updateOne(
    { _id: req.params.id },
    { $addToSet: { applicants: _id } }
  )
    .then(success => {
      if (success.nModified === 0) {
        return res.status(400).send({ message: 'You already applied for this job.' });
      }
      res.status(200).send({ message: 'Application submitted successfully.' });
    })
    .catch(error => res.status(400).send({ message: error.message }));
});

router.delete('/:id', authorization, (req, res) => {
  const { _id, role } = req.user;

  if (role === STUDENT)
    return res.status(401).send({ message: 'Access denied.' });

  if (role === COMPANY)
    return Job.deleteOne({ _id: req.params.id, _companyId: _id })
      .then(success => res.status(200).send(success.deletedCount.toString()))
      .catch(error => res.status(400).send({ message: error.message }));

  Job.eleteOne({ _id: req.params.id })
    .then(success => res.status(200).send(success.deletedCount.toString()))
    .catch(error => res.status(400).send({ message: error.message }));
});

export default router;
