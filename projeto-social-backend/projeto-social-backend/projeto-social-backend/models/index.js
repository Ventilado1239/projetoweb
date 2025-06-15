// models/index.js - VERSÃO DE DEBUG AVANÇADO
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = require('../config/database');

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    console.log(`--- Processando arquivo: ${file} ---`);
    
    // Passo 1: Apenas importa o arquivo
    const modelDefinition = require(path.join(__dirname, file));
    
    // Passo 2: Verifica o TIPO do que foi importado
    console.log(`Tipo de exportação para ${file}:`, typeof modelDefinition);
    
    // Passo 3: Se não for uma função, vamos parar aqui com um erro claro.
    if (typeof modelDefinition !== 'function') {
      console.error(`ERRO FATAL: O arquivo ${file} não exporta uma função! O conteúdo exportado é um: ${typeof modelDefinition}`);
      // Vamos mostrar o que ele é, se for um objeto
      if(typeof modelDefinition === 'object' && modelDefinition !== null) {
        console.log('Conteúdo do objeto exportado:', JSON.stringify(modelDefinition, null, 2));
      }
      throw new Error(`O arquivo ${file} não está no formato correto de exportação.`);
    }

    // Passo 4: Se for uma função, tenta executar
    const model = modelDefinition(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    console.log(`--- Modelo ${model.name} carregado com sucesso. ---`);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;