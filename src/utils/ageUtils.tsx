const calculateAge = (birthDateString: any) => {
  if (!birthDateString) return 0;

  // Asume formato DD-MM-YYYY (02-04-1990)
  const parts = birthDateString.split("-");

  // Reformatea a MM/DD/YYYY para compatibilidad con new Date()
  const formattedDateString = `${parts[1]}/${parts[0]}/${parts[2]}`;

  const birthDate = new Date(formattedDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Ajustar la edad si el cumpleaños aún no ha pasado este año
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export default calculateAge;
