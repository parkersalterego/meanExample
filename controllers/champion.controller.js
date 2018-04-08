const express = require('express');
const Champion = require('../models/champion.model');

class ChampionController {
    constructor(router) {
        router.route('/champions/:_id')
            .get(this.getOne)
            .put(this.updateOne)
            .delete(this.deleteOne)
        router.route('champions')
            .get(this.getAll)
            .post(this.insertOne)
    }

    async getOne(req, res, next) {
        try {
            Champions.getChampionById(req.params._id, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next(err);
        }
    }

    async updateOne(req, res, next) {
        try {
            let id = req.params._id;
            let champion = new Champion(req.body);

            Champions.updateChampion(id, champion, {}, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next(err);
        }
    }

    async deleteOne(req, res, next) {
        try {
            let id = req.params._id;

            Champions.deleteChampion(id, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next (err);
        }
    }

    async getAll(req, res, next) {
        try {
            Champions.getChampions((err, champions) => {
                res.json(champions);
            });
        } catch (err) {
            next(err);
        }
    }

    async insertOne(req, res, next) {
        try {
            let champion = new Champion(req.body);

            Champions.addChampion(champion, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = ChampionController;