const adminRoutes = require('../module/admin/adminRoutes')

export default (app: any) => {
  app.use('/admin', adminRoutes)
}
