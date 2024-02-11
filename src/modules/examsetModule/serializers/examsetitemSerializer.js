const moment = require('../../../utils/moment')

module.exports = {
  examsetitemSerializer: (examsetitem) => {
    return {
      id: examsetitem._id,
      no: examsetitem.no,
      question: examsetitem.question,
      category: {
        id: examsetitem.category_id._id,
        name: examsetitem.category_id.name,
      },
      create_date: examsetitem.createdAt
        ? moment(examsetitem.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      update_date: examsetitem.updatedAt
        ? moment(examsetitem.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      create_by_name: `${examsetitem.create_by.firstname} ${examsetitem.create_by.lastname}`,
      update_by_name: examsetitem.update_by
        ? `${examsetitem.update_by.firstname} ${examsetitem.update_by.lastname}`
        : null,
      del_flag: examsetitem.del_flag,
    }
  },
}
