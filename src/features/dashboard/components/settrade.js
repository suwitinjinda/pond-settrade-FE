const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { MongoClient } = require('mongodb');

// Path to the Excel file
const excelFilePath = 'C:/temp/NVDR Trading Data by Stock_03-05-2024.xlsx';
const jsonFilePath = 'C:/temp/example.json';

// Connection URI
const uri = 'mongodb://localhost:27017'; // Update with your MongoDB URI

// Database Name
const dbName = 'stockstat'; // Update with your database name

// Collection Name
const collectionName = 'settrade'; // Update with your collection name

// Function to ensure directory exists
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};
// Define a mapping of Thai month names to their English counterparts
const thaiMonthToEnglish = {
    'ม.ค.': 'Jan',
    'ก.พ.': 'Feb',
    'มี.ค.': 'Mar',
    'เม.ย.': 'Apr',
    'พ.ค.': 'May',
    'มิ.ย.': 'Jun',
    'ก.ค.': 'Jul',
    'ส.ค.': 'Aug',
    'ก.ย.': 'Sep',
    'ต.ค.': 'Oct',
    'พ.ย.': 'Nov',
    'ธ.ค.': 'Dec'
};

// Load Excel file
const workbook = xlsx.readFile(excelFilePath);

// Choose the sheet you want to convert (let's say the first sheet)
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(sheet);
// console.log(jsonData[1].__EMPTY_13)
const englishDate = convertThaiDateToEnglish(jsonData[1].__EMPTY_13);
// Iterate over each object and rename the key
const updatedData = (jsonData.slice(4)).map(obj => {
    // Create a new object with the updated key name
    const newObj = { ...obj };
    newObj.NO = newObj.__EMPTY; // Rename the key
    newObj.Symbol = newObj.__EMPTY_1
    newObj.VolBuy = newObj.__EMPTY_2
    newObj.VolSell = newObj.__EMPTY_3
    newObj.VolTotal = newObj.__EMPTY_4
    newObj.VolNet = newObj.__EMPTY_5
    newObj.VolVolume = newObj.__EMPTY_6
    newObj.VolNVDR = newObj.__EMPTY_7
    newObj.ValueBuy = newObj.__EMPTY_8
    newObj.ValueSell = newObj.__EMPTY_9
    newObj.ValueTotal = newObj.__EMPTY_10
    newObj.ValueNet = newObj.__EMPTY_11
    newObj.ValueValue = newObj.__EMPTY_12
    newObj.ValueNVDR = newObj.__EMPTY_13
    delete newObj.__EMPTY; // Delete the old key
    delete newObj.__EMPTY_1
    delete newObj.__EMPTY_2
    delete newObj.__EMPTY_3
    delete newObj.__EMPTY_4
    delete newObj.__EMPTY_5
    delete newObj.__EMPTY_6
    delete newObj.__EMPTY_7
    delete newObj.__EMPTY_8
    delete newObj.__EMPTY_9
    delete newObj.__EMPTY_10
    delete newObj.__EMPTY_11
    delete newObj.__EMPTY_12
    delete newObj.__EMPTY_13
    return newObj;
});

let pl = [{ date: englishDate, data: updatedData }]
// console.log(pl)

async function saveJSONToMongoDB(data) {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        console.log(data[0].date)
        const query = { date: data[0].date };
        const resultq = await collection.find(query).toArray();
        console.log(resultq)
        if (resultq[0] == null) {
            // Insert JSON data into the collection
            const result = await collection.insertMany(data);
            console.log(`${result.insertedCount} documents inserted.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

saveJSONToMongoDB(pl);

// Ensure directory exists
ensureDirectoryExistence(jsonFilePath);

// Write JSON data to a file
// fs.writeFileSync(jsonFilePath, JSON.stringify(pl, null, 2));

// console.log('Conversion completed. JSON file saved at: ' + jsonFilePath);


// Function to convert Thai date format to English date format
function convertThaiDateToEnglish(thaiDate) {
    // Split the date string into day, month, and year parts
    const parts = thaiDate.split('-');

    // Extract the day, month (in Thai), and year
    const day = parseInt(parts[0], 10);
    const thaiMonth = parts[1];
    const year = parseInt(parts[2], 10);

    // Get the English equivalent of the Thai month
    const englishMonth = thaiMonthToEnglish[thaiMonth];

    // Create a new Date object using the English month
    const englishDate = new Date(`${day}-${englishMonth}-${year}`);

    // Return the date in the desired format (07/05/2024)
    return englishDate.toLocaleDateString('en-US');
}
