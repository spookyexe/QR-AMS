from setuptools import setup, find_packages

setup(
    name='QR-AMS SCANNER',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'dependency1',
        'dependency2',
        # add any other dependencies your project needs
    ],
    entry_points={
        'console_scripts': [
            'your-command-name=your_module_name:your_function_name',
            # add any other command-line scripts your project provides
        ],
    },
    author='spookyexe',
    author_email='spookyexe1@gmail.com',
    description='scanner for the qr-code based attendance monitoring system (QR-AMS)',
    license='MIT',
    url='https://github.com/spookyexe/QR-AMS-SCANNER-',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
    ],
)