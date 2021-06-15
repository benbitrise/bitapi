import click
from config import config
from api.api import API

@click.group()
def build():
    pass

@build.command()
@click.option('-s', '--status', help="The status of the build: not finished (0), successful (1), failed (2), aborted with failure (3), aborted with success (4)")
@click.option('-a', '--after', help="builds started after unix timestamp")
@click.pass_context
def list(ctx, status, after):
    token = ctx.obj['token']
    app_slug = config.get_app()
    api = API(token)
    click.echo(api.list_builds(app_slug, status, after))

@build.command()
@click.argument('build-slug')
@click.pass_context
def get(ctx, build_slug):
    """Print details related to BUILD_SLUG."""
    token = ctx.obj['token']
    app_slug = config.get_app()
    api = API(token)
    click.echo(api.describe_build(app_slug, build_slug))

@build.command()
@click.argument('build-slug')
@click.pass_context
def logs(ctx, build_slug):
    """Print details related to BUILD_SLUG."""
    token = ctx.obj['token']
    app_slug = config.get_app()
    api = API(token)
    click.echo(api.build_log(app_slug, build_slug))