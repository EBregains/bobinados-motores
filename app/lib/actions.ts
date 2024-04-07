'use server'

interface MotorUDT {
  _id?: string | null,
  motor: {
    marca: string | null,
    potencia: number | null,
    condensador: number | null,
    num_polos: number | null,
    conexion_polos: string | null,
    num_ranuras: number | null,
    tipo: "monofasico" | "trifasico" | null,
  },
  estator: {
    diametro: number | null,
    largo: number | null,
  },
  bobinas: Array<{
    alambres: Array<number> | null,
    instrucciones: [{
      pasos: number | null,
      vueltas: number | null,
    }]
  }>,
  molde: {
    tamanho: string | null,
    separacion: {
      largo: number | null,
      tipo: "interior" | "exterior" | null
      ancho: number | null,
    }
  }
}

export async function crearMotor(formData: FormData) {

  let motor: MotorUDT = {
    "motor": {
      marca: null,
      potencia: 0,
      condensador: 0,
      num_polos: 0,
      conexion_polos: null,
      num_ranuras: 0,
      tipo: null
    },
    "bobinas": [
      {
        "alambres": [],
        "instrucciones": [
          {pasos:0, vueltas:0}
        ]
      },
    ],
    estator: {
      largo: 0,
      diametro: 0,
    },
    "molde": {
      "tamanho": null,
      "separacion": {
        tipo: null,
        ancho: 0,
        largo: 0
      }
    }
  };
  motor.motor.marca = formData.get("marca") as string;
  motor.motor.potencia = Number(formData.get("potencia") as string);
  motor.motor.condensador = Number(formData.get("condensador") as string);
  motor.motor.num_polos = Number(formData.get("num_polos") as string);
  motor.motor.conexion_polos = formData.get("conexion_polos") as string;
  motor.motor.num_ranuras = Number(formData.get("num_ranuras") as string);
  motor.motor.tipo = formData.get("tipo") as "monofasico" | "trifasico" | null;

  console.log(formData);

}


//////
// TODO : INSTALL ZOD AND VALIDATE
//////