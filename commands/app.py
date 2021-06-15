import click
from config import config

@click.group()
def app():
    pass

@app.command()
def show():
    click.echo(config.get_app())

@app.command()
@click.argument('slug')
def set(slug):
    config.set_app(slug)