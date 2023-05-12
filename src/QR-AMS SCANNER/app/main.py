import modules.scanner as scanner


class App:
    def __init__(self) -> None:
        pass

    def run(self):
        my_scanner = scanner.Scanner()
        print(my_scanner.run())

if __name__ == '__main__':
    app = App()
    app.run()