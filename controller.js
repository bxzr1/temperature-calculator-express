const { create, read, update, deleteWeather } = require('./database.js')

exports.create = async (req, res) => {
    const temp = req.body.temp;
    const newWeather = await create(temp);
    res.status(200).json({
        data: newWeather.rows[0],
    })
}

exports.getHistory = async (req, res) => {
    const allWeather = await read();
    res.status(200).json({ data: allWeather.rows });
}

exports.editHistory = async (req, res) => {
    const { id, newTemp } = req.body;
    console.log(id);
    console.log(newTemp);
    const updatedWeather = await update(id, Number(newTemp));
    res.status(200).json({ data: updatedWeather.rows[0] });
}

exports.deleteHistory = async (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    const deletedWeather = await deleteWeather(id);
    res.status(200).send('Deleted.');
}