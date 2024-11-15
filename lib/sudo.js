// Import dotenv and load environment variables from .env file
require("dotenv").config();

const { Pool } = require("pg");

// Use the 'settings' module to get the DATABASE_URL from your configurations
const s = require("../settings");

// Retrieve the database URL from the settings.DATABASE_URL
const dbUrl = settings.DATABASE_URL 
  ? settings.DATABASE_URL 
  : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";

// Database connection configuration
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

// Function to create the "sudo" table if it doesn't already exist
async function createSudoTable() {
  const client = await pool.connect();
  try {
    // Execute SQL query to create the "sudo" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS sudo (
        id serial PRIMARY KEY,
        jid text NOT NULL
      );
    `);
    console.log("The 'sudo' table has been successfully created.");
  } catch (error) {
    console.error("An error occurred while creating the 'sudo' table:", error);
  } finally {
    client.release();
  }
}

// Call the function to create the "sudo" table
createSudoTable();

// Function to check if a group is authorized (sudo)
async function isSudo(jid) {
  const client = await pool.connect();
  try {
    // Check if the group exists in the "sudo" table
    const query = "SELECT EXISTS (SELECT 1 FROM sudo WHERE jid = $1)";
    const values = [jid];
  
    const result = await client.query(query, values);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error occurred while checking if the group is authorized:", error);
    return false;
  } finally {
    client.release();
  }
}

// Function to remove a group from the authorized list
async function removeSudoNumber(jid) {
  const client = await pool.connect();
  try {
    // Delete the jid from the "sudo" table
    const query = "DELETE FROM sudo WHERE jid = $1";
    const values = [jid];
  
    await client.query(query, values);
    console.log(`Group ${jid} removed from the list of authorized numbers.`);
  } catch (error) {
    console.error("Error occurred while removing the group from the authorized list:", error);
  } finally {
    client.release();
  }
}

// Function to add a group to the authorized list
async function addSudoNumber(jid) {
  const client = await pool.connect();
  try {
    // Insert the jid into the "sudo" table
    const query = "INSERT INTO sudo (jid) VALUES ($1)";
    const values = [jid];
  
    await client.query(query, values);
    console.log(`Group ${jid} added to the list of authorized numbers.`);
  } catch (error) {
    console.error("Error occurred while adding the group to the authorized list:", error);
  } finally {
    client.release();
  }
}

// Function to get all the authorized groups
async function getAllSudoNumbers() {
  const client = await pool.connect();
  try {
    // Select all jids from the "sudo" table
    const query = "SELECT jid FROM sudo";
    const result = await client.query(query);
  
    // Create an array of jids
    const sudoNumbers = result.rows.map((row) => row.jid);
  
    return sudoNumbers;
  } catch (error) {
    console.error("Error occurred while fetching authorized numbers:", error);
    return [];
  } finally {
    client.release();
  }
}

// Function to check if the "sudo" table is not empty
async function isSudoTableNotEmpty() {
  const client = await pool.connect();
  try {
    // Execute a query to count the number of rows in the "sudo" table
    const result = await client.query('SELECT COUNT(*) FROM sudo');
  
    // Get the row count value
    const rowCount = parseInt(result.rows[0].count);
  
    // If the row count is greater than zero, the table is not empty
    return rowCount > 0;
  } catch (error) {
    console.error('Error occurred while checking the "sudo" table:', error);
    return false; // In case of error, assume the table is empty
  } finally {
    client.release();
  }
}

// Export the functions for use in other modules
module.exports = {
  isSudo,
  addSudoNumber,
  removeSudoNumber,
  getAllSudoNumbers,
  isSudoTableNotEmpty
};
