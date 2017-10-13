var EventModel = require('../models/EventModel.js');

/**
 * EventController.js
 *
 * @description :: Server-side logic for managing Events.
 */
module.exports = {

    /**
     * EventController.list()
     */
    list: function (req, res) {
        EventModel.find(function (err, Events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Event.',
                    error: err
                });
            }
            return res.json(Events);
        });
    },

    /**
     * EventController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        EventModel.findOne({_id: id}, function (err, Event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Event.',
                    error: err
                });
            }
            if (!Event) {
                return res.status(404).json({
                    message: 'No such Event'
                });
            }
            return res.json(Event);
        });
    },

    /**
     * EventController.create()
     */
    create: function (req, res) {
        var Event = new EventModel({
        });

        Event.save(function (err, Event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Event',
                    error: err
                });
            }
            return res.status(201).json(Event);
        });
    },

    /**
     * EventController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        EventModel.findOne({_id: id}, function (err, Event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Event',
                    error: err
                });
            }
            if (!Event) {
                return res.status(404).json({
                    message: 'No such Event'
                });
            }

            Event.s_date = req.body.s_date ? req.body.s_date : Event.s_date;
            Event.save(function (err, Event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Event.',
                        error: err
                    });
                }

                return res.json(Event);
            });
        });
    },

    /**
     * EventController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        EventModel.findByIdAndRemove(id, function (err, Event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Event.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};