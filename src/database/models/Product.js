module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        products_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        products_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        marks_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        products_description: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        products_image: {
            type: dataTypes.STRING(55),
            allowNull: true
        },
        categories_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        products_price: {
            type: dataTypes.FLOAT(9,2).UNSIGNED,
            allowNull: false
        },
        products_discount: {
            type: dataTypes.SMALLINT(5).UNSIGNED,
            allowNull: true
        },
        products_active: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
    }
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'products'
    }

    Product.associate =  function(models) {
        Product.belongsTo(models.Mark, {
            as: 'mark',
            foreignKey : "marks_id"
        });
        Product.belongsTo(models.Category, {
            as: "category",            
            foreignKey: "categories_id"            
        })
    }; 
    const Product = sequelize.define(alias, cols, config);
    return Product;
}