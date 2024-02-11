const moment = require('../../../utils/moment')

module.exports = {
  enrollSerializer: (enroll) => {
    return {
      id: enroll._id,
      user: {
        _id: enroll.user_id._id,
        prefix: enroll.user_id.prefix,
        firstname: enroll.user_id.firstname,
        lastname: enroll.user_id.lastname,
        fullname: `${enroll.user_id.firstname} ${enroll.user_id.lastname}`,
        email: enroll.user_id.email,
        phone: enroll.user_id.phone,
        school: enroll.user_id.school,
      },
      examset: enroll.examset_id,
      start_datetime: enroll.start_datetime
        ? moment(enroll.start_datetime).format('YYYY-MM-DD HH:mm:ss')
        : null,
      end_datetime: enroll.end_datetime
        ? moment(enroll.end_datetime).format('YYYY-MM-DD HH:mm:ss')
        : null,
      is_submitted: enroll.is_submitted,
      is_evaluated: enroll.is_evaluated,
      attempt: enroll.attempt,
      create_date: enroll.createdAt ? moment(enroll.createdAt).format('YYYY-MM-DD HH:mm:ss') : null,
      update_date: enroll.updatedAt ? moment(enroll.updatedAt).format('YYYY-MM-DD HH:mm:ss') : null,
      del_flag: enroll.del_flag,
    }
  },
}
