'use strict';

const mongoose = require('mongoose')
const Event = mongoose.model('Event')

exports.get = (req, res, next) => {
  Event
    .find({}, "title creationDate")
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    })
}
exports.getById = (req, res, next) => {
  Event
    .findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    })
}

exports.post = (req, res, next) => {
  const event = new Event();
  event.title = req.body.title;
  event.description = req.body.description;
  event.date = req.body.date;
  event
    .save()
    .then(x => {
      res.status(201).send({ message: "Event create successfully." })
    }).catch(e => {
      res.status(400).send({
        message: "Sorry, we have a error while creating your event.",
        data: e
      })
    });
  res.status(201).send(req.body);
}

exports.put = (req, res, next) => {
  const id = req.params._id;
  Event
    .findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        initialTime: req.body.initialTime,
        finalTime: req.body.finalTime,
      }
    }).then(x => {
      res.status(200).send({
        message: 'Evento atualizado com sucesso! :)'
      });
    }).catch(e => {
      res.status(400).send({
        message: 'Houve uma falha ao atualizar evento. Você pode tentar novamente?',
        data: e
      });
    });
};

exports.delete = (req, res, next) => {
  Event
    .findOneAndRemove(req.body.id)
    .then(x => {
      res.status(200).send({
        message: 'Evento removido com sucesso! :)'
      });
    }).catch(e => {
      res.status(400).send({
        message: 'Houve uma falha ao remover o evento. Você pode tentar novamente?',
        data: e
      });
    });
};