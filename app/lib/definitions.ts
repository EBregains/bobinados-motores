export type Motor = {
  _id: String,
  motor: {
    titulo: String,
    marca: String,
    potencia: String,
    unidad_potencia: String,
    condensador: String,
    num_polos: String,
    num_ranuras: String,
    tipo: String
  },
  conexion: {
    a_linea: String,
    entre_polos: String,
    disposicion: String,
    resistencia_bornes: String,
    cant_alambre: String,
  },
  bobinas: Array<
    {
      tipo: String,
      alambres: Array<String>,
      instrucciones: Array<{pasos:String, vueltas:String}>
    }
  >,
  estator: {
    largo: String,
    diametro: String,
  },
  molde: {
    tamanho: String,
    separacion: {
      tipo: String,
      ancho: String,
      largo: String
    }
  },
  extras: {
    observaciones: String,
  }
}