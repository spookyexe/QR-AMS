const QrCode = require('qrcode-reader')
const jimp = require('jimp');

const fs = require('fs');

function login(rl) {
    // read `students.json` file to check whether the user is registered
    fs.readFile('public/json/students.json', (err, studentData) => {
        if (err) {
            console.error(err)
        } else {
            // reads the directory `LOGIN` where "currently" scanning student QR CODE is located
            fs.readdir('LOGIN', (err, files) => {
                if (err) {
                    console.error(err)
                    return
                } else {
                    // decodes QR CODE in `LOGIN`
                    const qrPath = `LOGIN/${files[0]}`;
                    
                    try {
                        var Jimp = require("jimp");
                        const imageData = fs.readFileSync(qrPath);
                        
                        // Load the image data with Jimp
                        jimp.read(imageData, (err, image) => {
                            if (err) {
                                console.error(err);
                                return;
                            }

                            // Create a new instance of the QrCode reader
                            const qr = new QrCode();
                            
                            // Decode the QR code image
                            qr.callback = (err, value) => {
                            if (err) {
                                console.error(err);
                            }
                            console.log(value.result);

                            // prompts user to enter the time they arrived
                            rl.question('Time Arrived: ', function(time) {
                                // storing the attendance information 
                                const studentID = value.result
                                const timeLate = 7.15
                                
                                const data = JSON.parse(studentData)
                                let found = false;
                                
                                // goes through all objects in `students.json` to check enter the corresponding information based on the decoded UUID from the QR CODE
                                try {
                                    for (let gradeLevel in data.GradeLevels) {
                                        let sections = data.GradeLevels[gradeLevel].Sections;
                                        
                                        for (let section in sections) {
                                          let studentNames = sections[section].studentNames;
                                          
                                          for (let i = 0; i < studentNames.length; i++) {
                                            let student = studentNames[i];
                                            
                                            if (student.hasOwnProperty(studentID)) {
                                              console.log(`Welcome ${student[studentID]}, you arrived at ${time}.`);
                                              found = true;

                                              console.log(`${gradeLevel} | ${section}`)
        
                                              const attendanceTemplate = {
                                                  id: studentID,
                                                  name: student[studentID],
                                                  time: time,
                                                  attendance: "Present",
                                                  remarks: "N/A"
                                              }

                                              const dataFilePath = `public/json/${gradeLevel}/${section}.json`

                                            //   store information in their respective `.json` files
                                              fs.readFile(dataFilePath, (err, attendanceData) => {
                                                if (err) {
                                                    console.error(err)
                                                } else {
                                                    // checks whether user is late or not
                                                    if (time >= timeLate) {
                                                        attendanceTemplate.remarks = "LATE"
                                                    }
                                                    //   store information in their respective `.json` files
                                                    const attendanceJSON = JSON.parse(attendanceData)
        
                                                    attendanceJSON.push(attendanceTemplate)
        
                                                    fs.writeFile(dataFilePath, JSON.stringify(attendanceJSON, null, 2), (err) => {
                                                        if (err) {
                                                        console.error(err);
                                                        return;
                                                        };
                                                    })
                                                }
                                              })
                                              break;
                                            }
                                          }
                                          
                                          if (found) {
                                            break;
                                          }
                                        }
                                        
                                        if (found) {
                                          break;
                                        }
                                      }
                                    } catch {
                                        console.log('YOU ARE NOT REGISTERED!')
                                    }
                                rl.close()
                            })
                        };
                        qr.decode(image.bitmap);
                        });
                } catch (err) {
                        console.error(err);
                    }
            }
        })
        }
    })
}

module.exports = {login}