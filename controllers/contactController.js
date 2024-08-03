const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const {id} = req.user;
    const contact = await Contact.create({createdBy: id, ...req.body});
    res.status(201).json({message: 'Record Created Successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const {id} = req.user;
    const page =  req.query.page ? parseInt(req.query.page) - 1 : 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page * limit;
    const { count, rows } = await Contact.findAndCountAll({
      where: { createdBy: id },
      limit: limit,
      offset: offset,
    });
    res.json({
      total: count,
      data: rows,
      status: true
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.body.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.update(req.body);
    res.json({message: 'Record Updated Successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(parseInt(req.query.id));
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.destroy();
    res.json({ message: 'Record deleted Successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};
