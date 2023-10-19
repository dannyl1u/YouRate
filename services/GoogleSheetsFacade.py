from oauth2client.service_account import ServiceAccountCredentials
import gspread
import os

class GoogleSheet:
    def __init__(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))

        self.creds_path = os.path.join(dir_path, '..', 'creds.json')
        self._sheet = self._initialize_sheet()

    def _initialize_sheet(self):
        scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/drive"
        ]

        creds = ServiceAccountCredentials.from_json_keyfile_name(self.creds_path, scope)
        client = gspread.authorize(creds)
        return client.open("YouRate").sheet1

    def append_to_sheet(self, data):
        self._sheet.append_row(data)

    def read_from_sheet(self, row, col):
        return self._sheet.cell(row, col).value
