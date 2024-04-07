export async function FetchMotores() {
  try {
    const res = await fetch("http://localhost:3000/api/motores", {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Failed to fetch api")
    }
    const motores = await res.json()
    
    return motores 
  } catch (error) {
    console.log(error);
  }
}

export async function FetchMotor(id: String) {
  try {
    const res = await fetch(`http://localhost:3000/api/motores/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Motor");
    }

    const { motor } = await res.json()
    return motor
  } catch (error) {
    console.log(error);
  }
}