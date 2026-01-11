

// Pool de base de datos dummy para modo mock
console.log("⚠️  Usando pool de base de datos dummy para modo mock");

module.exports = {
  query: async (text, params) => {
    console.log('📝 Query simulada:', { text, params });
    // Retornar un objeto con estructura esperada
    return { 
      rows: [], 
      rowCount: 0,
      command: 'SELECT',
      oid: null,
      fields: []
    };
  },
  
  // Métodos adicionales para compatibilidad
  connect: async () => {
    console.log('🔗 Conexión a BD simulada');
    return {
      query: async (text, params) => {
        console.log('📝 Query en cliente:', { text, params });
        return { rows: [], rowCount: 0 };
      },
      release: () => console.log('🔓 Cliente liberado')
    };
  },
  
  end: () => console.log('🔚 Pool cerrado')
};