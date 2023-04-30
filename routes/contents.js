const express = require('express');
const contentControler = require('../controller/contents');

const router = express.Router();


// router
//     .route('/')
//     .get(contentControler.findAll)
//     .post(contentControler.create)
//     .patch(contentControler.update);

// router
//     .route('/:id')
//     .patch(contentControler.update)
//     .delete(contentControler.findAll);

router
    .route('/')
    .post(contentControler.create)
    .patch(contentControler.update)
    .get(contentControler.findAll);

router
    .route('/:id')
    .get(contentControler.findAll)
    .patch(contentControler.update)
    .delete(contentControler.findAll);

module.exports = router;