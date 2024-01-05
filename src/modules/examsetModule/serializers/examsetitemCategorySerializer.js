const moment = require('../../../utils/moment')

module.exports = {
  examsetitemCategorySerializer: (examsetitemCategory) => {
    return {
      id: examsetitemCategory._id,
      name: examsetitemCategory.name,
      create_date: examsetitemCategory.createdAt
        ? moment(examsetitemCategory.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      update_date: examsetitemCategory.updatedAt
        ? moment(examsetitemCategory.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      create_by_name: `${examsetitemCategory.create_by.firstname} ${examsetitemCategory.create_by.lastname}`,
      update_by_name: examsetitemCategory.update_by
        ? `${examsetitemCategory.update_by.firstname} ${examsetitemCategory.update_by.lastname}`
        : null,
      del_flag: examsetitemCategory.del_flag,
    }
  },
}
