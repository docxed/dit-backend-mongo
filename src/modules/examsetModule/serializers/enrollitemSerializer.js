const moment = require('../../../utils/moment')

module.exports = {
  enrollitemSerializer: (enrollitem) => {
    return {
      id: enrollitem._id,
      answer: enrollitem.answer,
      examsetitem: enrollitem.examsetitem_id,
      user: {
        _id: enrollitem.user_id._id,
        prefix: enrollitem.user_id.prefix,
        firstname: enrollitem.user_id.firstname,
        lastname: enrollitem.user_id.lastname,
        fullname: `${enrollitem.user_id.firstname} ${enrollitem.user_id.lastname}`,
        email: enrollitem.user_id.email,
        phone: enrollitem.user_id.phone,
        school: enrollitem.user_id.school,
      },
      create_date: enrollitem.createdAt
        ? moment(enrollitem.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      update_date: enrollitem.updatedAt
        ? moment(enrollitem.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      del_flag: enrollitem.del_flag,
    }
  },
}
