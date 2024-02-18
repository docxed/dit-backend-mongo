const ExamsetModel = require('../../examsetModule/models/examsetModel')
const EnrollModel = require('../../examsetModule/models/enrollModel')
const EnrollitemModel = require('../../examsetModule/models/enrollitemModel')
const EvaluateModel = require('../../examsetModule/models/evaluateModel')
const EvaluateitemModel = require('../../examsetModule/models/evaluateitemModel')
const moment = require('../../../utils/moment')

module.exports = {
  getReportExamset: async (filter = {}) => {
    const evaluates = await EvaluateModel.find({
      examset_id: filter.examset_id,
      is_evaluated: true,
      del_flag: false,
    }).populate('user_id')
    const evaluateitems = await EvaluateitemModel.find({
      evaluate_id: { $in: evaluates.map((evaluate) => evaluate._id) },
      del_flag: false,
    })
      .populate({
        path: 'enrollitem_id',
        populate: { path: 'examsetitem_id', populate: { path: 'category_id' } },
      })
      .populate({
        path: 'enroll_id',
        populate: { path: 'user_id' },
      })

    const report = evaluates.map((evaluate) => {
      const evs = evaluateitems
        .filter((evaluateitem) => evaluateitem.evaluate_id.toString() === evaluate._id.toString())
        .map((evaluateitem) => {
          return {
            enroll: {
              _id: evaluateitem.enroll_id._id,
              student: `${evaluateitem.enroll_id.user_id.prefix}${evaluateitem.enroll_id.user_id.firstname} ${evaluateitem.enroll_id.user_id.lastname}`,
              school: evaluateitem.enroll_id.user_id.school,
              gender: evaluateitem.enroll_id.user_id.gender
                ? evaluateitem.enroll_id.user_id.gender === 'M'
                  ? 1
                  : 2
                : 'ไม่ระบุ',
              dq_score: evaluateitem.enroll_id.user_id.dq_score,
              create_date: moment(evaluateitem.enroll_id.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            },
            question_no: evaluateitem.enrollitem_id.examsetitem_id.no,
            category: evaluateitem.enrollitem_id.examsetitem_id.category_id.name,
            answer: evaluateitem.enrollitem_id.answer
              ? `${process.env.PROD_URL}/file/media/${evaluateitem.enrollitem_id.answer}`
              : null,
            score: evaluateitem.score,
            comment: evaluateitem.comment,
          }
        })
      const evs_group_by_enroll = evs.reduce((acc, ev) => {
        const index = acc.findIndex((a) => a.enroll._id.toString() === ev.enroll._id.toString())
        if (index === -1) {
          acc.push({
            enroll: ev.enroll,
            evs: [ev],
          })
        } else {
          acc[index].evs.push(ev)
        }
        return acc
      }, [])
      const evs_summary = evs_group_by_enroll.map((ev) => {
        const total_score = ev.evs.reduce((acc, e) => acc + e.score, 0)
        const total_question = ev.evs.length
        const avg_score = total_score / total_question
        return {
          enroll: ev.enroll,
          evs: ev.evs,
          total_score,
          total_question,
          avg_score,
        }
      })

      return {
        create_date: moment(evaluate.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        school: evaluate.user_id.school,
        teacher: `${evaluate.user_id.prefix}${evaluate.user_id.firstname} ${evaluate.user_id.lastname}`,
        evaluates: evs_summary,
      }
    })
    return report
  },
}
