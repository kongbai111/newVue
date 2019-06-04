const host = 'http://www.zhoulinchong.cn:3001'
const backEnd = process.env.NODE_ENV === 'production'
  ? 'http://www.zhoulinchong.cn:3001'
  : '/api'
export {
  host,
  backEnd
}
