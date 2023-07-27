const Card = require('../models/card');
const {
  ValidationError,
  NotFoundError,
  ForbiddenError,
} = require('../middlewares/error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Card data is incorrect'));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('card not found');
    })
    .then((card) => {
      if (`${card.owner}` !== req.user._id) {
        throw new ForbiddenError('You can only delete your own cards');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
          throw new NotFoundError('card not found');
        })
        .then(() => {
          res.status(200).send({ message: 'successfully deleted' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('card not found'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Card data is incorrect'));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('card not found'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Card data is incorrect'));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
