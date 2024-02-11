const moment = require('../../../utils/moment')

module.exports = {
  evaluateSerializer: (evaluate) => {
    return {
      id: evaluate._id,
      examset: evaluate.examset_id,
      is_evaluated: evaluate.is_evaluated,
      user: {
        _id: evaluate.user_id._id,
        prefix: evaluate.user_id.prefix,
        firstname: evaluate.user_id.firstname,
        lastname: evaluate.user_id.lastname,
        fullname: `${evaluate.user_id.firstname} ${evaluate.user_id.lastname}`,
        email: evaluate.user_id.email,
        phone: evaluate.user_id.phone,
        school: evaluate.user_id.school,
      },
      create_date: evaluate.createdAt
        ? moment(evaluate.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      update_date: evaluate.updatedAt
        ? moment(evaluate.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      del_flag: evaluate.del_flag,
    }
  },
}
