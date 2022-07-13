const dataAccess = require('./data-access.js');

const main = async () => {
   
    let r = await dataAccess.getPersons();
    
    

    console.log(r);
     process.exit()
}

main();