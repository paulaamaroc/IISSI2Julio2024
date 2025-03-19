import { Performance, Restaurant, RestaurantCategory } from '../models/models.js'
import { Op } from 'sequelize'
// SOLUCION -> copiar el create de algun otro modelo
const create = async function (req, res) {
// TO-DO: here's the controller code for create a new performance
  const newPerformance = Performance.build(req.body)
  try {
    const performance = await newPerformance.save()
    res.json(performance)
  } catch (err) {
    res.status(500).send(err)
  }
}

const indexOwner = async function (req, res) {
  try {
    // Fecha de hoy a medianoche
    const hoy = new Date(Date.now())
    hoy.setHours(0, 0, 0, 0) // H:M:S:MS
    // fecha dentro de una semana a medianoche
    const limite1semana = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    limite1semana.setHours(0, 0, 0, 0)
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        where: { userId: req.user.id },
        include: [{
          model: RestaurantCategory,
          as: 'restaurantCategory'
        },
        // SOLUCION
        {
          model: Performance,
          as: 'performances',
          where: {
            appointment: {
              [Op.and]: [{ [Op.gte]: hoy }, { [Op.lt]: limite1semana }]
            }
          },
          required: false // Para los restauarntes que no tenga actuaciones tmb sean visibles
        }]
      })
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

const PerformanceController = {
  create,
  indexOwner
}
export default PerformanceController
