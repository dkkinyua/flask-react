from main import create_app
from config import DevelopmentConfig

if __name__ == "__main__":
    app = create_app(DevelopmentConfig)
    app.run()  