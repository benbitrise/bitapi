import click
from commands.build import build
from commands.app import app
from config import config

@click.group()
@click.option('--token', envvar='BITRISE_ACCESS_TOKEN')
@click.pass_context
def cli(ctx, token):
    if token is None:
        raise click.BadParameter("Missing API Access token")
    ctx.ensure_object(dict)
    ctx.obj['token'] = token
        

@cli.command()
def init():
    config.init()

cli.add_command(build)
cli.add_command(app)

if __name__ == '__main__':
    cli()