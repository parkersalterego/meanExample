const express = require('express');
const Champion = require('../models/champion.model');

class ChampionController {
    constructor(router) {
        router.route('/champions/:_id')
            .get(this.getOne)
            .put(this.updateOne)
            .delete(this.deleteOne)
        router.route('/champions')
            .get(this.getAll)
            .post(this.insertOne)
    }

    async getOne(req, res, next) {
        try {
            Champion.getChampionById(req.params._id, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next(err);
        }
    }

    async updateOne(req, res, next) {
        try {
            let id = req.params._id;
            let abilities = req.params.abilities;
            let price = req.params.price;
            let champion = new Champion({
                name: req.params.name,
                title: req.params.title,
                image: req.params.image,
                price: price,
                abilities: abilites,
                quote: req.params.quote
            });

            Champion.updateChampion(id, champion, {}, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next(err);
        }
    }

    async deleteOne(req, res, next) {
        try {
            let id = req.params._id;

            Champion.deleteChampion(id, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next (err);
        }
    }

    async getAll(req, res, next) {
        try {
            Champion.getChampions((err, champions) => {
                res.json(champions);
            });
        } catch (err) {
            next(err);
        }
    }

    async insertOne(req, res, next) {
        try {
            console.log('working');
            let champion = new Champion(req.body);

            Champion.addChampion(champion, (err, champion) => {
                res.json(champion);
            });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = ChampionController;