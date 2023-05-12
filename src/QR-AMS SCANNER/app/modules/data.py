import json
import uuid

class Data:
    def __init__(self) -> None:
        self.registerStudentDataPath = '../DATABASE/registered_students.json'

    def detectDuplicate(self, grade_level, section_name, id):
        attendancePath = f'../DATABASE/ATTENDANCE DATA/{grade_level}/{section_name.lower()}.json'
        with open(attendancePath, 'r') as file:
            attendance = json.load(file)

            for item in attendance:
                if id == item['id']:
                    return True
                
            return False

    def getRegisteredStudentsData(self, id):
        with open(self.registerStudentDataPath, 'r') as data:
            registeredStudents = json.load(data)

            for grade_level, sections in registeredStudents["GradeLevels"].items():
                for section_name, section_data in sections["Sections"].items():
                    for student in section_data["studentNames"]:
                        if id in student:

                            return grade_level, section_name, student[id]
    
    def inputAttendance(self, id, grade_level, section_name, student_name, time, remarks):
        attendancePath = f'../DATABASE/ATTENDANCE DATA/{grade_level}/{section_name.lower()}.json'
        with open(attendancePath, 'r') as attendance:
            attendance_data = json.load(attendance)

        self.attendanceTemplate = {
            'id': id,
            'name': student_name,
            'time': time,
            'remarks': remarks
        }

        if not self.detectDuplicate(grade_level, section_name, id):

            attendance_data.append(self.attendanceTemplate)

            with open(attendancePath, 'w') as file:
                json.dump(attendance_data, file, indent=4)
        else:
            print('QR-CODE DUPLICATE')

    
    def is_valid_uuid(self, uuid_str):
        try:
            uuid_obj = uuid.UUID(uuid_str, version=4)
        except ValueError:
            return False
        return str(uuid_obj) == uuid_str
