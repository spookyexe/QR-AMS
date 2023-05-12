import cv2
import numpy as np
from pyzbar.pyzbar import decode
import datetime
import uuid

from modules.data import Data

class Scanner:
    def __init__(self) -> None:
        self.windowName = "QR-AMS Scanner"
        self.cap = cv2.VideoCapture(1)
        self.scannerIsRunning = True

        self.detector = cv2.QRCodeDetector()
        self.qrCodeDetected = False
        self.invalidCode = False
        self.qrScanned = False
        self.duplicateQR = False

        self.late_time = datetime.time(7, 15)

        self.remarks = 'N/A'

        self.uuid = uuid.uuid4()

    def run(self):
        self.openCam()

    def openCam(self):
        while self.scannerIsRunning:
            ret, frame = self.cap.read()

            self.detectQR(frame)


            # KEYBOARD EVENTS
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                print('scanner terminated')
                break

            elif key == 13:
                # reset everything
                print('scan again')
                self.qrCodeDetected = False
                self.invalidCode = False
                self.detectDuplicate = False
                self.qrScanned = False

        self.cap.release()
        cv2.destroyAllWindows()

    def text(self, img, rect_pts, text, color): # OPEN CV TEXT TEMPLATE
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(img, text, (rect_pts[0], rect_pts[1]), font, 1, color, 2)

    def gui(self, img): # OPEN CV DISPLAY GUI

        if self.qrCodeDetected:
            if self.detectDuplicate and not self.qrScanned and not self.invalidCode:
                self.text(img, (5, 30), 'DUPLICATE ENTRY', (0, 0, 255)) 

            elif not self.invalidCode:
                self.qrScanned = True
                self.text(img, (5, 30), f'{self.grade_level} - {self.section_name} | {self.student_name}', (255, 255, 255))
                self.text(img, (5, 60), f'Time of Arrival: {self.current_time.strftime("%H:%M:%S")}', (255, 255, 255))
                self.text(img, (5, 470), 'Press "enter" to scan again.', (255, 255, 255))

                if self.current_time >= self.late_time:
                    self.text(img, (5, 90), 'LATE', (0, 0, 255))

            elif self.invalidCode and not self.qrScanned:
                self.text(img, (5, 30), 'INVALID QR-CODE', (0, 0, 255))

            if self.grade_level is None or self.section_name is None or self.student_name is None or self.detectDuplicate is None:
                self.invalidCode = True
            else:
                self.invalidCode = False
        else:
            pass


    def scanned(self):
        if not self.qrCodeDetected:
            try:
                self.qrCodeDetected = True

                self.current_time = datetime.datetime.now().time()

                print(f'{self.grade_level} - {self.section_name} | {self.student_name} | {self.current_time.strftime("%H:%M:%S")}')

                if self.current_time >= self.late_time:
                    self.remarks = 'LATE'


                self.data.inputAttendance(self.decodedData, self.grade_level, self.section_name, self.student_name, self.current_time.strftime("%H:%M:%S"), self.remarks)
            except:
                self.invalidCode = True

            
    def detectQR(self, img):
        self.data = Data()
        
        self.decodedData = ""
        for data in decode(img):
            self.decodedData = data.data.decode("utf-8")

            try:
                self.grade_level, self.section_name, self.student_name = self.data.getRegisteredStudentsData(self.decodedData)
                self.detectDuplicate = self.data.detectDuplicate(self.grade_level, self.section_name, self.decodedData)
            except TypeError:
                self.grade_level, self.section_name, self.student_name = None, None, None
                self.detectDuplicate = None

            self.scanned()

            if self.decodedData:
                points = np.array(data.polygon, np.int32)
                points = points.reshape((-1, 1, 2))

                cv2.polylines(img, [points], True, (0, 255, 0), 5)

        self.gui(img)
        cv2.imshow(self.windowName, img)