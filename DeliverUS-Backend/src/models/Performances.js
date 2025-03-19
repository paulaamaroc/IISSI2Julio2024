// This is a new file for solution!
import { Model } from 'sequelize'
import { Restaurant } from './models'
const loadModel = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
* Helper method for defining associations.
* This method is not a part of Sequelize lifecycle.
* The `models/index` file will call this method automatically.
*/
    static associate (models) {
      // define association here
      Restaurant.belongsTo(models.RestaurantCategory, { foreignKey: 'restaurantCategoryId', as: 'restaurantCategory' })
      Restaurant.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Restaurant.hasMany(models.Product, { foreignKey: 'restaurantId', as: 'products' })
      Restaurant.hasMany(models.Order, { foreignKey: 'restaurantId', as: 'orders' })

      // SOLUCION-> 1 retsauarnte tiene varias actuaciones
      Restaurant.hasMany(models.Performance, { foreignKey: 'restaurantId', as: 'performances' })

      // SOLUCION
      Performance.belongsTo(models.Restaurant, {
        foreignKey: 'restaurantId',
        as: 'restaurant',
        onDelete: 'cascade'
      })
    }
  }
  // SOLUCION
  // "id", "group", "appointment" y "restaurantId"
  Performance.init({
    group: DataTypes.STRING,
    appointment: DataTypes.DATE,
    restaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Performance'
  })
  return Performance
}
export default loadModel
