const Tickets = require('../models/tickets.model');
const verifySchema = require('../validators/validate');
const schema = require('../validators/schema.json');

const list = async (req, res) => {
    try {
        const tickets = await Tickets.find({ userId: req.userId });

        if (tickets.length > 0) {
            res.status(200).json({ success: true, data: tickets });
        } else {
            res.status(200).json({ success: true, data: [] });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch tickets', error: error.message });
    }
};



const add = async (req, res) => {
    const verifyReq = verifySchema(schema.addTicket, req.body);
    if (!verifyReq.success) {
        return res.status(400).send(verifyReq.message);
    }
    
    const { title, description, deadline } = req.body;
    const userId = req.userId;
    try {
        const newTicket = new Tickets({
            title,
            description,
            deadline,
            userId
        });

        const savedTicket = await newTicket.save();

        res.status(201).json({
            message: 'Ticket added successfully',
            ticket: savedTicket,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add Ticket', error: error.message });
    }
};



const edit= async(req, res) => {
    
}


const remove= async(req, res) => {
    
}


module.exports = { list, add, edit, remove };
