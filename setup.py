from setuptools import setup

setup(
    name='bitapi',
    version='0.0.1',
    py_modules=['entry'],
    install_requires=[
        'click',
        'requests'
    ],
    entry_points={
        'console_scripts': [
            'bitapi = entry:cli',
        ]
    },
)