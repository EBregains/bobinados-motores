'use server'

interface MotorUDT {
  _id: string | null,
  motor: {
    marca: string | null,
    potencia: string | null,
    condensador: string | null,
    numpolos: string | null,
    numranuras: string | null,
    tipo: "monofasico" | "trifasico",
  },
  estator: {
    diametro: string | null,
    largo: string | null,
  },
  bobinas: [{
    alambres: Array<number> | null,
    instrucciones: [{
      pasos: number | null,
      vueltas: number | null,
    }]
  }],
  molde: {
    separacion: "interior" | "exterior" | null
    largo: number | null,
    ancho: number | null,
  }
}

export async function crearMotor(formData: FormData) {

  let motor;
  console.log(formData);
  
}