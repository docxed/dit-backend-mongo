const moment = require('../../../utils/moment')

module.exports = {
  evaluateitemSerializer: (evaluateitem) => {
    return {
      id: evaluateitem._id,
      score: evaluateitem.score,
      comment: evaluateitem.comment,
      user: {
        _id: evaluateitem.user_id._id,
        prefix: evaluateitem.user_id.prefix,
        firstname: evaluateitem.user_id.firstname,
        lastname: evaluateitem.user_id.lastname,
        fullname: `${evaluateitem.user_id.firstname} ${evaluateitem.user_id.lastname}`,
        email: evaluateitem.user_id.email,
        phone: evaluateitem.user_id.phone,
        school: evaluateitem.user_id.school,
      },
      create_date: evaluateitem.createdAt
        ? moment(evaluateitem.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      update_date: evaluateitem.updatedAt
        ? moment(evaluateitem.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      del_flag: evaluateitem.del_flag,
    }
  },
}
