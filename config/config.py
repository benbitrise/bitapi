import json
import os

configpath = os.path.expanduser('~/.bitapi')

def init():
    with open(configpath, "w") as f:
        json.dump({}, f)

def get_app():
    with open(configpath) as f:
        config = json.load(f)
        try:
            return config['app']
        except KeyError:
            return None

def set_app(slug):
    with open(configpath, 'r+') as f: 
        config = json.load(f)
        f.seek(0)
        config['app'] = slug
        json.dump(config, f)
        f.truncate()
