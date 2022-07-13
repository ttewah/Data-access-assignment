const INSERT_STORE_DATA =
   `insert into 
       store (store_name, days_open)
    values 
      ($1, $2) 
    returning store_id;`
const INSERT_LOCATION_DATA = 
`insert into 
   location(store_name_id, location) 
values 
   ($1, $2)
returning location-id;`
const INSERT_STAFF_DATA = 
`insert into 
   staff (location_id, staff, store_id)  
values 
   ($1, $2 ,$3)
returning staff_id;`
const INSERT_CLOTHES_DATA = 
`insert into 
   clothes(store_brand, price, store_id) 
values 
   ($1, $2, $3)
returning clothes-id;`
const UPDATE_LOCATION_ID = 'update store set location_id =$1 where store_id = $2;'
const GET_STAFF = 'select staff from staff where store_id =$1;'

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password:"Diane1991@" ,
  database: "postgres",
  host: "localhost",
  port: 5432,
});

//
exports.Statement1 = async () => {
    let storeName = 'Ross'
    let daysOpen = 'Wednesday'
    return await this.insertStore(storeName, daysOpen)
}

exports.insertStore = async (storeName, daysOpen) => {
   let retval = null;
    try{
        let r = await pool.query(INSERT_STORE_DATA, [storeName, daysOpen]);
        retval = r.rows[0];
    }catch (err){
        console.error(err);
    }
    return retval;
}

//
exports.Statement2 = async () => {
    let storeNameId = 3
    let location = 'Manassas'
    return await this.insertLocation(storeNameId, location)
}

exports.insertLocation = async (storeNameId, location) => {
   let retval = null;
    try{
        let r = await pool.query(INSERT_LOCATION_DATA, [storeNameId, location]);
        retval = r.rows[0];
    }catch (err){
        console.error(err);
    }
    return retval;
}
//
exports.Statement3 = async () => {
    let locationId = 4
    let staff = 'Sam'
    let storeId = 3
    return await this.insertStaff(locationId, staff, storeId)
}

exports.insertStaff = async (locationId, staff, storeId) => {
   let retval = null;
    try{
        let r = await pool.query(INSERT_STAFF_DATA, [locationId, staff, storeId]);
        retval = r.rows[0];
    }catch (err){
        console.error(err);
    }
    return retval;
}

//
exports.Statement4 = async () => {
    let storebrand = 'Gucci'
    let price = '$500'
    let storeId = 3
    return await this.insertClothes(storebrand, price, storeId)
}

exports.insertClothes = async (storebrand, price, storeId) => {
   let retval = null;
    try{
        let r = await pool.query(INSERT_CLOTHES_DATA, [storebrand, price, storeId]);
        retval = r.rows[0];
    }catch (err){
        console.error(err);
    }
    return retval;
}

//
exports.Statement5 = async () => {
    let locationId = 1
    let storeId = 3
    return await this.updatePerson(locationId, storeId)
}
exports.updatePerson = async (locationId, storeId) => {
    let retval = null;
    try {
      let r = await pool.query(UPDATE_LOCATION_ID, [locationId, storeId]);
      retval = r.rows[0];
    } catch (err) {
      console.error(err);
    }
    return retval;
}
//
exports.Statement6 = async () => {
    let storeId = 3
    console.log(await this.getStaff(storeId))
}
exports.getStaff = async (storeId) => {
    let retval = null;
   
    try{
        let r = await pool.query(GET_STAFF, [storeId]);
        retval = r.rows[0];
    }catch (err){
        console.error(err);
    }
    return retval;
}
//