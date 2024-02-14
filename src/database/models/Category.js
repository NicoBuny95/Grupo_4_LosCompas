module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        categories_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        categories_description: {
            type: dataTypes.STRING(75),
            allowNull: false
        },
    }
    let config = {
        timestamps: false,
        tableName: 'categories'
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate =  function(models) {
        Category.hasMany(models.Product, {
            as: 'product',
            foreignKey : "categories_id"
        })
    }; 

    return Category;
}