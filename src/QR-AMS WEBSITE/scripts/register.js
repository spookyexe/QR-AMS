const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const qr = require('qr-image')

function register(rl) {
    // Read the students.json file where the registered student data are stored
    fs.readFile('../DATABASE/registered_students.json', (err, studentData) => {
        if (err) {
            console.error(err)
        } else {

            const studentJSON = JSON.parse(studentData)

            // prompts the user their respective grade level, section, and name. To be used for the application
            rl.question("Enter Grade Level: ", function(yearLevel) {
                rl.question("Enter Section: ", function(section) {
                    rl.question("Enter Name: ", function(studentName) {

                        const ID = uuidv4()
                        
                        // stdudent data template for the JSON file
                        const studentTemplate = {
                            studentName: `${studentName}`
                        }

                        // configures the student data template
                        studentTemplate[ID] = studentTemplate['studentName'];
                        delete studentTemplate['studentName'];
                        studentJSON.GradeLevels[yearLevel].Sections[section].studentNames.push(studentTemplate)

                        // generate QR CODE
                        const generateQR = qr.image(ID, { type: 'png', margin: 4})
                        const outputPath = `../QR-CODES/${yearLevel}/${section}/${studentName}.png`
                        // create a file in `outputPath`
                        generateQR.pipe(fs.createWriteStream(outputPath))

                        // after generating a QR CODE, information will be stored in `students.json`
                        fs.writeFile('../DATABASE/registered_students.json', JSON.stringify(studentJSON, null, 2), (err) => {
                            if (err) {
                            console.error(err);
                            return;
                            };
                        })
                        
                        rl.close()
                        })
                })
            })
        }
   })


}

// exporting the function `register` to be used for other nodeJS scripts
module.exports = {register}