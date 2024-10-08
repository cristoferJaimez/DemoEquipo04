export const environment = {
    production: false,
    apiLogin: 'https://localhost:7119/api/v1/Auth/Login',  // Aquí defines la URL del backend para desarrollo

    apiRegister : 'https://localhost:7119/api/v1/Auth/Register',


  
    //Animal
    apiAllAnimal: 'https://localhost:7119/api/v1/Animal',
    apiPostAnimal: 'https://localhost:7119/api/v1/Animal',
    apiGetAnimal: 'https://localhost:7119/api/v1/Animal', // El {id} se inyectará dinámicamente en el código
    apiPutAnimal: 'https://localhost:7119/api/v1/Animal', // El {id} se inyectará dinámicamente en el código
    apiDeleteAnimal: 'https://localhost:7119/api/v1/Animal', // El {id} se inyectará dinámicamente en el código


    //Cuidador
    apiAllCuidador : 'https://localhost:7119/api/v1/Cuidador',
    apiPostCuidador : 'https://localhost:7119/api/v1/Cuidador',
    apiGetCuidador : 'https://localhost:7119/api/v1/Cuidador/{id}',
    apiPutCuidador : 'https://localhost:7119/api/v1/Cuidador/{id}',
    apiDeleteCuidador : 'https://localhost:7119/api/v1/Cuidador/{id}',


    //Cuidado
    apiGetCuidado : 'https://localhost:7119/api/v1/Cuidado/{animalId}/{cuidadorId}',
    apiPostCuidado : 'https://localhost:7119/api/v1/Cuidado',

    //Examen
    apiGetExamen : 'https://localhost:7119/api/v1/Examen/{id}',
    apiPutExamen : 'https://localhost:7119/api/v1/Examen/{id}',
    apiDeleteExamen : 'https://localhost:7119/api/v1/Examen/{id}',
    apiPostExamen : 'https://localhost:7119/api/v1/Examen',

    //vacuna
    apiGetVacuna : 'https://localhost:7119/api/v1/vacuna/{id}',
    apiPostVacuna : 'https://localhost:7119/api/v1/vacuna',
  
  };
  
 