const Event = require('../models/event');
module.exports = function (app) {
    app.get('/events', (req, res) => {
        Event.getEvents((err, data) => {
            res.status(200).json(data);
        });
    });
    app.post('/events', (req, res) => {
        const eventData = {
            id: null,
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            capacity: req.body.capacity,
            audence: req.body.audence,
            description: req.body.description,
            tipo: req.body.tipo,
            created_at: new Date(),
            updated_at: new Date()
        };
        Event.insertEvent(eventData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    id: null,
                    name: eventData.name,
                    location: eventData.location,
                    date: eventData.date,
                    capacity: eventData.capacity,
                    audence: eventData.audence,
                    description: eventData.description,
                    tipo: eventData.tipo,
                })
            } else {
                res.status(500).json({
                    success: false,
                    data: 'Error'
                })
            }
        })
    });

    app.put('/events/:id', (req, res) => {
        const eventData = {
            id: parseInt(req.params.id),
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            capacity: req.body.capacity,
            audence: req.body.audence,
            description: req.body.description,
            tipo:req.body.tipo,
            created_at: new Date(),
            updated_at: new Date()
        };
        console.log(eventData)
        Event.updateEvent(eventData, (err, data) => {
            if (data && data.message) {
                res.json({
                    id: eventData.id,
                    name: eventData.name,
                    location: eventData.location,
                    date: eventData.date,
                    capacity: eventData.capacity,
                    audence: eventData.audence,
                    description: eventData.description,
                    tipo: eventData.tipo,
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });
    
    app.delete('/events/:id', (req, res) => {
        Event.deleteEvent(parseInt(req.params.id), (err, data) => {
            if (data && data.message == 'deleted' || data.message == 'not exists') {
                res.json({
                    id: parseInt(req.params.id)
                })
            }else{
                res.status(500).json({
                    message: "error"
                })
            }
        })
    });

}
