const moment = require('../../../utils/moment')

module.exports = {
  examsetSerializer: (examset) => {
    return {
      id: examset._id,
      title: examset.title,
      description: examset.description,
      time: Number(examset.time),
      max_attempt: Number(examset.max_attempt),
      is_password: examset.is_password,
      password: examset.password,
      create_date: examset.createdAt
        ? moment(examset.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      update_date: examset.updatedAt
        ? moment(examset.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      create_by_name: `${examset.create_by.firstname} ${examset.create_by.lastname}`,
      update_by_name: examset.update_by
        ? `${examset.update_by.firstname} ${examset.update_by.lastname}`
        : null,
      del_flag: examset.del_flag,
      is_published: examset.is_published,
    }
  },
}
