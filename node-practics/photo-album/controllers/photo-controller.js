
let controller = {
  updateHandle: function(req) {

    const {title, src} = req.body;
    const { id } = req.params;
    var query = 'UPDATE `photo_album` SET ';
    if (title) {
      query += ' `title`= ?';
    }
    if (src) {
      query += ' `src`=?';
    }
    query += ' WHERE id = ?';

    console.log("update", query);
    return query;
  }
}

module.exports = controller;
